import React from 'react';
import { User } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export const ProductCard = ({ product, onClick }) => {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 bg-card"
      onClick={onClick}
    >
      {/* IMAGEN */}
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
            <span className="text-4xl">📷</span>
          </div>
        )}
        <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white/100 backdrop-blur-sm shadow-sm">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          {/* ✨ CAMBIO: Lógica para precio 0 */}
          {product.price === 0 ? (
             <p className="text-sm font-bold text-green-600 uppercase tracking-wide">
               Gratis / Intercambio
             </p>
          ) : (
             <p className="text-lg font-bold text-primary">
               {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(product.price)}
             </p>
          )}

          <h3 className="font-medium text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
            {product.sellerImage ? (
              <img src={product.sellerImage} alt={product.sellerName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-card-foreground">
              {product.sellerName || "Usuario"} 
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};