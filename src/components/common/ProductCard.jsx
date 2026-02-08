import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from "lucide-react";
// Asegúrate de que estas rutas de importación sean correctas según tu estructura
import { Badge } from '../ui/badge'; 
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Card, CardContent, CardFooter } from '../ui/card';

export function ProductCard({ product }) {
  const navigate = useNavigate();

  // Formatear precio a euros de forma segura
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price || 0);

  return (
    <Card 
      // AQUÍ ESTABA EL ERROR: Ahora usamos navigate directamente
      onClick={() => navigate(`/producto/${product.id}`)}
      className="group overflow-hidden cursor-pointer border-border/60 shadow-sm hover:shadow-md transition-all"
    >
      {/* Imagen y Badge */}
      <div className="aspect-square relative overflow-hidden bg-muted/20">
        <img
          src={product.image || "https://via.placeholder.com/400"} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="font-medium bg-white/90 backdrop-blur-sm text-foreground shadow-sm">
            {product.category || "General"}
          </Badge>
        </div>
      </div>
      
      {/* Contenido Principal */}
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2 flex-1">
                {product.title}
            </h3>
             <p className="text-lg font-bold text-primary whitespace-nowrap">
                {formattedPrice}
            </p>
        </div>
       
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{product.location || "Ubicación no disponible"}</span>
        </div>
      </CardContent>

       {/* Footer con Usuario */}
      <CardFooter className="p-4 pt-0 border-t border-border/40 flex items-center gap-3">
         <Avatar className="w-8 h-8 border border-border/50">
            <AvatarImage src={product.userAvatar} />
            <AvatarFallback className="text-xs">{product.userName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{product.userName || "Usuario"}</p>
            <p className="text-xs text-muted-foreground">Publicado recientemente</p>
          </div>
      </CardFooter>
    </Card>
  );
}