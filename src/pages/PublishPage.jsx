import React, { useState } from 'react';
import { Upload, DollarSign } from 'lucide-react';
// Importamos los componentes de diseño "oficiales"
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea'; // <--- AQUÍ IMPORTAMOS EL NUEVO COMPONENTE

const PublishPage = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Publicar anuncio</h1>
          <p className="text-muted-foreground">Rellena los detalles para compartir tu producto.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalles del producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Fotos */}
            <div className="space-y-3">
              <label className="text-sm font-medium leading-none">Imágenes</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <label className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground font-medium">Subir</span>
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border">
                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Título del anuncio</label>
              <Input placeholder="Ej: Calculadora Casio FX-82" />
            </div>

            {/* Precio y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Precio (€)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="number" className="pl-9" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>Seleccionar...</option>
                  <option>Libros</option>
                  <option>Electrónica</option>
                  <option>Material</option>
                </select>
              </div>
            </div>

            {/* Descripción (AQUÍ ES DONDE USAMOS EL NUEVO COMPONENTE) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción</label>
              <Textarea 
                placeholder="Describe el estado del producto, tiempo de uso, etc..." 
                className="resize-none min-h-[120px]" 
              />
            </div>

            {/* Botón de Publicar */}
            <Button size="lg" className="w-full text-base">
              Publicar ahora
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublishPage;