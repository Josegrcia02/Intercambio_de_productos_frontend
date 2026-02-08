import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, MessageCircle, Heart, Share2, ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Card, CardContent } from '../components/ui/card';
import { mockProducts } from '../data/mockProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Buscamos el producto por ID en nuestros datos falsos
    // Nota: Convertimos id a número si tus ids son números, o string si son strings.
    const foundProduct = mockProducts.find(p => p.id.toString() === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Si no existe, volvemos al inicio (opcional)
      navigate('/');
    }
  }, [id, navigate]);

  if (!product) return <div className="p-10 text-center">Cargando producto...</div>;

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  return (
    <div className="min-h-screen bg-muted/30 pb-10">
      {/* 1. Botón Volver */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="w-4 h-4" />
          Volver a resultados
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 2. Columna Izquierda: IMÁGENES */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-border shadow-sm relative">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
             <Button size="icon" variant="secondary" className="absolute top-4 right-4 rounded-full shadow-md bg-white/80 backdrop-blur hover:bg-white">
              <Heart className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          {/* Miniaturas (Simuladas) */}
          <div className="grid grid-cols-4 gap-4">
            {[product.image, product.image, product.image].map((img, i) => (
               <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                  <img src={img} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
               </div>
            ))}
          </div>
        </div>

        {/* 3. Columna Derecha: INFORMACIÓN */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border-blue-100">
                {product.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {product.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
              {product.title}
            </h1>
            <p className="text-3xl font-bold text-primary mb-4">
              {formattedPrice}
            </p>
          </div>

          {/* Tarjeta del Vendedor */}
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar className="w-12 h-12 border border-border">
                <AvatarImage src={product.userAvatar} />
                <AvatarFallback>{product.userName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-base">{product.userName}</h3>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <span>⭐⭐⭐⭐⭐ (12 valoraciones)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Ver perfil</Button>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full text-lg h-12 gap-2 shadow-lg shadow-primary/20">
              <MessageCircle className="w-5 h-5" />
              Chat con el vendedor
            </Button>
            <div className="grid grid-cols-2 gap-3">
               <Button size="lg" variant="secondary" className="w-full h-12">
                 Comprar ahora
               </Button>
               <Button size="lg" variant="outline" className="w-full h-12 gap-2">
                 <Share2 className="w-4 h-4" /> Compartir
               </Button>
            </div>
          </div>

          {/* Descripción */}
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <h3 className="text-foreground font-semibold text-lg mb-2">Descripción</h3>
            <p className="leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
            <p className="mt-4">
              Producto en perfecto estado. Se entrega en mano en la zona del instituto o se envía por correo certificado.
            </p>
          </div>

           {/* Aviso de seguridad */}
           <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-sm text-blue-800 border border-blue-100">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <p>Tu compra está protegida. Nunca envíes dinero fuera de la aplicación y revisa el producto al recibirlo.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;