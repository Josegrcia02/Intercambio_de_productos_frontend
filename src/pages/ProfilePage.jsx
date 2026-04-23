import React, { useState, useEffect } from 'react';
import { Settings, LogOut, Package, ShieldCheck, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// IMPORTACIONES UI
import { ProductCard } from '../components/common/ProductCard';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

// Ahora apunta directamente a components/SettingsModal
import SettingsModal from '../components/SettingsModal'; 

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `http://127.0.0.1:8000${imagePath}`;
};

const ProfilePage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar el modal
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await api.get('/productos?user=me');
        setMyProducts(response.data);
      } catch (error) {
        console.error("Error al cargar mis productos:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyProducts();
  }, [user]);

  if (!user) return <div className="p-10 text-center">Cargando perfil...</div>;

  const totalIntercambios = myProducts.filter(p => p.estado === 'INTERCAMBIADO').length;
  const totalReservados = myProducts.filter(p => p.estado === 'RESERVADO').length;
  const totalActivos = myProducts.filter(p => p.estado === 'DISPONIBLE').length;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 pb-20">
      
      {/* HEADER DEL PERFIL */}
      <Card className="mb-8 overflow-hidden border-gray-100 shadow-sm">
        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <CardContent className="px-6 pb-6 relative">
          <div className="flex justify-between items-end -mt-10 mb-4">
            
            {/* AVATAR */}
            <div className="rounded-xl bg-white p-1 shadow-md">
              <Avatar className="w-20 h-20 rounded-lg">
                <AvatarImage src={getImageUrl(user.foto_perfil)} className="object-cover" />
                <AvatarFallback className="rounded-lg text-2xl bg-blue-50 text-blue-600">
                  {user.username?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex gap-2 mb-1">
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="gap-2"
                 onClick={() => setIsSettingsOpen(true)} // Abrir Modal
               >
                 <Settings size={16} /> Configurar
               </Button>
               <Button 
                 variant="destructive" 
                 size="sm" 
                 onClick={logout}
                 className="gap-2"
               >
                 <LogOut size={16} /> Salir
               </Button>
            </div>
          </div>

          <div>
            {/* NOMBRE: Muestra alias si existe, si no username */}
            <h1 className="text-2xl font-bold text-gray-900">
              {user.alias || user.username || "Estudiante"}
            </h1>

            {/* NRE (si tiene alias) */}
            {user.alias && (
              <p className="text-xs text-muted-foreground font-mono mt-0.5 mb-1">
                NRE: {user.username}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Mail size={14} /> {user.email || "Sin correo"}</span>
              <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium text-xs border border-green-100">
                <ShieldCheck size={12} /> Cuenta Verificada
              </span>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-50">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{myProducts.length}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total</p>
            </div>
            <div className="text-center border-l">
              <p className="text-xl font-bold text-green-600">{totalIntercambios}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Éxitos</p>
            </div>
            <div className="text-center border-l">
              <p className="text-xl font-bold text-amber-600">{totalReservados}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Reservados</p>
            </div>
            <div className="text-center border-l">
              <p className="text-xl font-bold text-blue-600">{totalActivos}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Activos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECCIÓN: MIS PUBLICACIONES */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Package className="text-blue-600 w-5 h-5" /> Mis Publicaciones
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {[1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-xl"></div>)}
          </div>
        ) : myProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map(rawProduct => {
              
              let mainImage = null;
              if (rawProduct.imagenes && rawProduct.imagenes.length > 0) {
                 mainImage = rawProduct.imagenes[0].imagen || rawProduct.imagenes[0];
              } else if (rawProduct.imagen) {
                 mainImage = rawProduct.imagen; 
              }

              const mappedProduct = {
                id: rawProduct.id,
                title: rawProduct.titulo,
                description: rawProduct.descripcion,
                price: parseFloat(rawProduct.precio || 0),
                category: rawProduct.categoria_detalle?.nombre || "General",
                image: getImageUrl(mainImage),
                sellerName: rawProduct.usuario?.username || "Usuario",
                sellerImage: getImageUrl(rawProduct.usuario?.foto_perfil),
              };

              return (
                <div key={rawProduct.id} className="relative group">
                  <ProductCard 
                    product={mappedProduct} 
                    onClick={() => navigate(`/product/${rawProduct.id}`)}
                  />
                  
                  <div className="absolute top-2 left-2 z-10">
                    <Badge 
                      variant={rawProduct.estado === 'DISPONIBLE' ? 'default' : 'secondary'}
                      className={`${
                        rawProduct.estado === 'DISPONIBLE' ? 'bg-green-500 hover:bg-green-600' :
                        rawProduct.estado === 'RESERVADO' ? 'bg-amber-500 hover:bg-amber-600' :
                        rawProduct.estado === 'PENDIENTE' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                        'bg-gray-500 text-white'
                      }`}
                    >
                      {rawProduct.estado === 'PENDIENTE' ? 'EN REVISIÓN' : rawProduct.estado}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center border-dashed">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground">
              <Package size={24} />
            </div>
            <h3 className="font-medium mb-1">No tienes publicaciones</h3>
            <p className="text-sm text-muted-foreground mb-4">Empieza a subir tus apuntes o instrumentos.</p>
            <Button onClick={() => navigate('/publicar')}>
              Publicar ahora
            </Button>
          </Card>
        )}
      </div>

      {/* RENDERIZADO DEL MODAL */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

    </div>
  );
};

export default ProfilePage;