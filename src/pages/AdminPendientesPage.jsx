import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ConfirmModal from '../components/common/ConfirmModal';

const AdminPendientesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToReject, setProductToReject] = useState(null);

  useEffect(() => {
    // Si no es admin, fuera
    if (user && !user.is_staff) {
      navigate('/');
      return;
    }

    if (user?.is_staff) {
      fetchPendientes();
    }
  }, [user, navigate]);

  const fetchPendientes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/productos/pendientes');
      setProductos(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar productos pendientes');
    } finally {
      setLoading(false);
    }
  };

  const handleAprobar = async (id) => {
    try {
      await api.post(`/productos/${id}/aprobar`);
      toast.success('Producto aprobado');
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      toast.error('Error al aprobar');
    }
  };

  const handleRechazarClick = (id) => {
    setProductToReject(id);
    setIsConfirmOpen(true);
  };

  const confirmRechazar = async () => {
    if (!productToReject) return;

    try {
      await api.post(`/productos/${productToReject}/rechazar`);
      toast.success('Producto rechazado');
      setProductos(productos.filter(p => p.id !== productToReject));
    } catch (error) {
      toast.error('Error al rechazar');
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  if (!user || !user.is_staff) return null;

  return (
    <div className="container mx-auto p-4 max-w-6xl pb-20">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
          <ShieldAlert size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-500 text-sm">Revisa las publicaciones pendientes de aprobación.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20"><Loader2 className="animate-spin text-red-500 w-10 h-10" /></div>
      ) : productos.length === 0 ? (
        <Card className="p-10 text-center border-dashed">
          <h3 className="text-lg font-bold text-gray-700">Todo al día</h3>
          <p className="text-gray-500">No hay productos pendientes de revisión.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map(p => (
            <Card key={p.id} className="overflow-hidden flex flex-col relative border-orange-200 shadow-sm">
              <Badge className="absolute top-2 left-2 z-10 bg-orange-500">Pendiente</Badge>
              <div
                className="h-48 bg-gray-100 relative cursor-pointer overflow-hidden group"
                onClick={() => navigate(`/product/${p.id}`)}
                title="Ver detalles del producto"
              >
                <img
                  src={p.imagenes?.length > 0 ? getImageUrl(p.imagenes[0].imagen) : getImageUrl(p.imagen)}
                  alt={p.titulo}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-gray-500 mb-1">{p.categoria_detalle?.nombre || 'Categoría'}</p>
                <h3
                  className="font-bold text-lg mb-2 hover:underline cursor-pointer text-blue-900"
                  onClick={() => navigate(`/product/${p.id}`)}
                  title="Ver detalles del producto"
                >
                  {p.titulo}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">{p.descripcion}</p>

                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                  <span>Subido por:</span>
                  <strong className="text-gray-900">{p.usuario?.username}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => handleRechazarClick(p.id)}>
                    <X size={16} className="mr-1" /> Rechazar
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAprobar(p.id)}>
                    <Check size={16} className="mr-1" /> Aprobar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmRechazar}
        title="Rechazar Publicación"
        message="¿Estás seguro de que quieres rechazar este producto? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default AdminPendientesPage;
