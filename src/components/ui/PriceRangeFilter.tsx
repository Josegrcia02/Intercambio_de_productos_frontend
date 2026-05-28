import React, { useEffect, useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { cn } from "./utils";

export type PriceRange = [number, number];

export interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  step?: number;
  value?: PriceRange;
  defaultValue?: PriceRange;
  onChange?: (range: PriceRange) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  formatValue?: (value: number) => string;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeRange = (
  range: PriceRange,
  min: number,
  max: number,
  step: number
): PriceRange => {
  const [rawMin, rawMax] = range;
  let lower = clamp(rawMin, min, max);
  let upper = clamp(rawMax, min, max);

  if (lower > upper) {
    [lower, upper] = [upper, lower];
  }

  if (upper - lower < step) {
    upper = clamp(lower + step, min, max);
    lower = clamp(upper - step, min, max);
  }

  return [lower, upper];
};

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  min = 0,
  max = 1200,
  step = 10,
  value,
  defaultValue,
  onChange,
  label = "Precio",
  className,
  disabled = false,
  formatValue = (price) => `${price} €`,
}) => {
  const baseRange = useMemo<PriceRange>(() => {
    if (value) return normalizeRange(value, min, max, step);
    if (defaultValue) return normalizeRange(defaultValue, min, max, step);
    return [min, max];
  }, [value, defaultValue, min, max, step]);

  const isControlled = value !== undefined;
  const [internalRange, setInternalRange] = useState<PriceRange>(baseRange);

  useEffect(() => {
    if (isControlled && value) {
      setInternalRange(normalizeRange(value, min, max, step));
    }
  }, [isControlled, value, min, max, step]);

  useEffect(() => {
    if (!isControlled) {
      setInternalRange(baseRange);
    }
  }, [baseRange, isControlled]);

  const [currentMin, currentMax] = internalRange;

  const percentMin = useMemo(() => ((currentMin - min) / (max - min)) * 100, [currentMin, min, max]);
  const percentMax = useMemo(() => ((currentMax - min) / (max - min)) * 100, [currentMax, min, max]);

  const updateRange = (nextRange: PriceRange) => {
    const normalized = normalizeRange(nextRange, min, max, step);
    if (!isControlled) {
      setInternalRange(normalized);
    }
    onChange?.(normalized);
  };

  const handleMinChange = (newValue: number) => {
    updateRange([Math.min(newValue, currentMax - step), currentMax]);
  };

  const handleMaxChange = (newValue: number) => {
    updateRange([currentMin, Math.max(newValue, currentMin + step)]);
  };

  const handleMinInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value);
    if (!Number.isNaN(parsed)) {
      handleMinChange(parsed);
    }
  };

  const handleMaxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value);
    if (!Number.isNaN(parsed)) {
      handleMaxChange(parsed);
    }
  };

  const handleRangeThumb = (nextRange: PriceRange) => {
    updateRange(nextRange);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm transition-all duration-300",
        disabled ? "opacity-70 pointer-events-none" : "hover:shadow-lg",
        className
      )}
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="block text-sm font-semibold text-foreground/90">{label}</span>
          <p className="text-xs text-muted-foreground">Ajusta el rango de precio y aplica en tiempo real.</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-[auto_auto]">
          <label className="group inline-flex flex-col gap-2 text-xs text-muted-foreground">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Mín.</span>
            <input
              type="number"
              min={min}
              max={currentMax - step}
              step={step}
              value={currentMin}
              onChange={handleMinInput}
              className="h-11 rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              aria-label="Precio mínimo"
            />
          </label>
          <label className="group inline-flex flex-col gap-2 text-xs text-muted-foreground">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Máx.</span>
            <input
              type="number"
              min={currentMin + step}
              max={max}
              step={step}
              value={currentMax}
              onChange={handleMaxInput}
              className="h-11 rounded-2xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              aria-label="Precio máximo"
            />
          </label>
        </div>
      </div>

      <div className="relative h-4 px-0 py-1">
        <Slider.Root
          value={[currentMin, currentMax]}
          min={min}
          max={max}
          step={step}
          onValueChange={handleRangeThumb}
          disabled={disabled}
          aria-label="Rango de precio"
          className="relative flex h-full w-full touch-none items-center"
        >
          <Slider.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-muted/70">
            <Slider.Range className="absolute h-full bg-primary/90" />
          </Slider.Track>
          <Slider.Thumb
            className="relative z-20 block h-4 w-4 rounded-full border border-border bg-card shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Precio mínimo"
          />
          <Slider.Thumb
            className="relative z-20 block h-4 w-4 rounded-full border border-border bg-card shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Precio máximo"
          />
        </Slider.Root>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>{formatValue(currentMin)}</span>
        <span>{formatValue(currentMax)}</span>
      </div>

    </div>
  );
};

export default PriceRangeFilter;
