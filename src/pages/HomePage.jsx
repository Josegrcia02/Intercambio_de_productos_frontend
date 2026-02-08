import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from '../components/common/ProductCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { mockProducts } from '../data/mockProducts';

const CATEGORIES = ["Todos", "Libros", "Electrónica", "Material", "Accesorios"];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  // Lógica de filtrado recuperada
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col bg-muted/30 min-h-[calc(100vh-4rem)]">
      {/* 1. Header Azul (Texto original recuperado) */}
      <div className="bg-primary p-6 shadow-md">
        <h1 className="text-2xl font-bold text-primary-foreground mb-4">Buscar Productos</h1>
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 bg-white border-0 focus-visible:ring-2 focus-visible:ring-white/50"
            />
          </div>
          <Button 
            variant="secondary"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="shrink-0 bg-white text-primary hover:bg-white/90"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 2. Panel de Filtros (Recuperado) */}
      {showFilters && (
        <div className="bg-white p-4 border-b border-border animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground">Categorías</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-transparent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Grid de Productos */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
            <Search className="w-12 h-12 mb-2 opacity-20" />
            <p>No se encontraron productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => console.log("Ver detalle", product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;