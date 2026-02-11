import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ShoppingCart, MapPin, X, Send, Lock, Unlock, CheckCircle, Trash2 } from 'lucide-react'; 
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'; 
import { getProductById, sendMessage, deleteProduct } from '../services/productServices';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.png"; 
  if (imagePath.startsWith('http')) return imagePath;
  return `http://127.0.0.1:8000${imagePath}`;
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Estados modal mensaje
  const [showModal, setShowModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);

  // --- NUEVOS ESTADOS PARA EL INTERCAMBIO ---
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [candidates, setCandidates] = useState([]); // Lista de posibles compradores (chat)
  const [selectedBuyer, setSelectedBuyer] = useState(""); // El ID del elegido

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        
        let imagesList = [];
        if (data.imagenes && data.imagenes.length > 0) {
          imagesList = data.imagenes.map(item => item.imagen);
        } else if (data.imagen) {
          imagesList = [data.imagen];
        }

        const mappedProduct = {
          id: data.id,
          title: data.titulo,
          description: data.descripcion,
          price: data.precio, 
          category: data.categoria?.nombre || "General",
          seller: data.usuario,
          sellerName: data.usuario?.alias || data.usuario?.username || "Usuario desconocido",
          sellerNre: data.usuario?.username,
          sellerImage: data.usuario?.foto_perfil,
          email: data.usuario?.email || "Email no disponible",
          status: data.estado, 
          images: imagesList 
        };

        setProduct(mappedProduct);
        if (imagesList.length > 0) setSelectedImage(imagesList[0]);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // --- EFECTO: Cargar candidatos cuando se abre el modal de intercambio ---
  useEffect(() => {
    if (showExchangeModal) {
       // Obtenemos las conversaciones para ver con quién ha hablado
       api.get('/mensajes/conversaciones').then(res => {
           const usuariosUnicos = [];
           const idsVistos = new Set();

           // Filtramos para obtener usuarios únicos de los chats
           res.data.forEach(chat => {
               if (!idsVistos.has(chat.otro_usuario.id)) {
                   idsVistos.add(chat.otro_usuario.id);
                   usuariosUnicos.push(chat.otro_usuario);
               }
           });
           setCandidates(usuariosUnicos);
       }).catch(console.error);
    }
 }, [showExchangeModal]);

  const isOwner = user?.id && product?.seller?.id && Number(user.id) === Number(product.seller.id);

  // --- ACCIÓN: RESERVAR / QUITAR RESERVA ---
  const handleToggleReserve = async () => {
    try {
      const response = await api.post(`/productos/${id}/cambiar_reserva`);
      setProduct({ ...product, status: response.data.nuevo_estado });
    } catch (error) {
      console.error("Error al cambiar reserva:", error);
      alert("No se pudo cambiar el estado de la reserva.");
    }
  };

  // --- ACCIÓN: ABRIR EL MODAL DE INTERCAMBIO (Antes finalizaba directo) ---
  const handleOpenExchangeModal = () => {
      setShowExchangeModal(true);
  };

  // --- ACCIÓN: ENVIAR CONFIRMACIÓN AL BACKEND ---
  const submitExchange = async () => {
    if (!selectedBuyer) return;

    try {
        await api.post(`/productos/${product.id}/marcar_intercambiado`, {
            comprador_id: selectedBuyer
        });
        
        alert("¡Felicidades! Intercambio registrado correctamente.");
        setShowExchangeModal(false);
        navigate('/perfil'); // Volvemos al perfil
    } catch (error) {
        console.error(error);
        alert("Error al registrar el intercambio.");
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    setSending(true);
    try {
      await sendMessage({
        receptor: product.seller.id,
        producto: product.id,
        contenido: messageText
      });
      alert("¡Mensaje enviado correctamente!");
      setShowModal(false);
      setMessageText("");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el mensaje.");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar esta publicación? No podrás deshacer esta acción.");
    
    if (confirm) {
      try {
        await deleteProduct(product.id);
        alert("Publicación eliminada correctamente.");
        navigate('/perfil');
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert("Error al eliminar el producto.");
      }
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (!product) return null;

  const safePrice = parseFloat(product.price) || 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-gray-100 pl-0">
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* GALERÍA */}
        <div className="space-y-4 relative">
          
          {/* BADGES DE ESTADO (Reservado / Intercambiado) */}
          {product.status === 'RESERVADO' && (
            <div className="absolute top-4 left-4 z-10 bg-amber-500 text-white px-4 py-1.5 rounded-lg font-bold shadow-lg flex items-center gap-2">
              <Lock className="w-4 h-4" /> RESERVADO
            </div>
          )}
          {product.status === 'INTERCAMBIADO' && (
            <div className="absolute top-4 left-4 z-10 bg-purple-600 text-white px-4 py-1.5 rounded-lg font-bold shadow-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> ¡INTERCAMBIADO!
            </div>
          )}

          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center relative">
            {selectedImage ? (
              <img src={getImageUrl(selectedImage)} alt={product.title} className="w-full h-full object-contain" />
            ) : (
              <span className="text-4xl text-gray-400">📷</span>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(img)} 
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={getImageUrl(img)} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-sm px-3 py-1">{product.category}</Badge>
              <span className="text-sm text-gray-500">Publicado recientemente</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            {safePrice === 0 ? (
              <span className="inline-block bg-green-100 text-green-700 text-lg font-bold px-4 py-2 rounded-lg border border-green-200">
                  🎁 GRATIS / INTERCAMBIO
              </span>
            ) : (
              <p className="text-3xl font-bold text-blue-600">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(safePrice)}
              </p>
            )}
          </div>

          <div className="prose prose-blue text-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
            <p className="whitespace-pre-line">{product.description || "Sin descripción."}</p>
          </div>

          {/* Vendedor */}
          <div className="border-t border-b border-gray-200 py-6 space-y-4">
            <div className="flex items-center gap-4">
               <Avatar className="h-14 w-14 border shadow-sm">
                  <AvatarImage src={getImageUrl(product.seller?.foto_perfil)} />
                  <AvatarFallback className="text-xl bg-blue-50 text-blue-600">
                    {product.sellerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>

              <div>
                <p className="font-bold text-gray-900 text-lg leading-tight">
                  {product.sellerName}
                </p>
                {product.seller?.alias && (
                    <p className="text-xs text-gray-400 font-mono">
                        NRE: {product.sellerNre}
                    </p>
                )}
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {product.email}
                </div>
              </div>
            </div>
          </div>

          {/* --- BOTONES DE ACCIÓN DINÁMICOS --- */}
          <div className="flex flex-col gap-3 pt-2">
            
            {/* CASO 1: YA INTERCAMBIADO (Finalizado) */}
            {product.status === 'INTERCAMBIADO' ? (
                 <div className="w-full bg-purple-50 border border-purple-200 text-purple-800 py-4 px-4 rounded-xl text-center font-bold text-lg">
                    🤝 ¡Intercambio Realizado!
                 </div>
            ) : product.status === 'RESERVADO' ? (
            
            /* CASO 2: RESERVADO */
              <div className="w-full space-y-3">
                <div className="w-full bg-amber-50 border border-amber-200 text-amber-700 py-4 px-4 rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2">
                  <Lock className="w-6 h-6" /> PRODUCTO RESERVADO
                </div>
                {isOwner && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          onClick={handleToggleReserve} 
                          className="w-full gap-2 border-amber-200 text-amber-600 hover:bg-amber-50"
                        >
                          <Unlock className="w-4 h-4" /> Reabrir
                        </Button>
                        <Button 
                          onClick={handleOpenExchangeModal} // AHORA ABRE MODAL
                          className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4" /> Confirmar
                        </Button>
                    </div>
                    {/* BOTÓN ELIMINAR */}
                    <Button variant="destructive" onClick={handleDelete} className="w-full gap-2">
                        <Trash2 className="w-4 h-4" /> Eliminar Publicación
                    </Button>
                  </>
                )}
              </div>
            ) : (
            
            /* CASO 3: DISPONIBLE */
              <>
                {isOwner ? (
                  <div className="w-full space-y-3">
                    <div className="w-full bg-gray-100 border border-gray-200 text-gray-500 py-4 px-4 rounded-xl text-center font-medium">
                      Esta publicación es tuya.
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                        variant="secondary" 
                        className="h-12 text-md gap-2"
                        onClick={handleToggleReserve}
                        >
                        <ShoppingCart className="w-4 h-4" /> Reservar
                        </Button>

                        <Button 
                        className="h-12 text-md gap-2 bg-purple-600 hover:bg-purple-700"
                        onClick={handleOpenExchangeModal} // AHORA ABRE MODAL
                        >
                        <CheckCircle className="w-4 h-4" /> Intercambiado
                        </Button>
                    </div>
                    {/* BOTÓN ELIMINAR */}
                    <Button variant="destructive" onClick={handleDelete} className="w-full gap-2 mt-2">
                        <Trash2 className="w-4 h-4" /> Eliminar Publicación
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      className="flex-1 gap-2 h-12 text-lg"
                      onClick={() => setShowModal(true)}
                    >
                      <MessageCircle className="w-5 h-5" /> Contactar
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="gap-2 h-12 text-lg"
                      onClick={() => alert("Envía un mensaje al vendedor para solicitar la reserva.")}
                    >
                      <ShoppingCart className="w-5 h-5" /> Reservar
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE MENSAJE */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> 
                Contactar con {product.seller?.username}
              </h3>
              <button onClick={() => setShowModal(false)} className="hover:bg-blue-700 rounded-full p-1 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Estás interesado en: <span className="font-semibold text-gray-900">{product.title}</span>
              </p>
              <Textarea 
                placeholder="Hola, me interesa tu producto. ¿Podemos quedar?" 
                className="min-h-[120px] resize-none"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSendMessage} disabled={sending || !messageText.trim()}>
                  {sending ? "Enviando..." : (
                    <>Enviar Mensaje <Send className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL SIMPLE DE INTERCAMBIO (NUEVO) --- */}
      {showExchangeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl scale-100 animate-in zoom-in-95">
            
            <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                    <CheckCircle size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">¡Enhorabuena!</h2>
                <p className="text-sm text-gray-500 mt-1">
                    ¿Qué alumno se ha quedado con tu <strong>{product.title}</strong>?
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Seleccionar Alumno</label>
                    <select 
                        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        onChange={(e) => setSelectedBuyer(e.target.value)}
                        value={selectedBuyer}
                    >
                        <option value="">Selecciona de tus chats...</option>
                        {candidates.length > 0 ? (
                            candidates.map(u => (
                                <option key={u.id} value={u.id}>{u.username}</option>
                            ))
                        ) : (
                            <option disabled>No tienes chats abiertos</option>
                        )}
                    </select>
                    {candidates.length === 0 && (
                        <p className="text-xs text-red-400">
                            * Solo puedes intercambiar con personas con las que hayas hablado por chat.
                        </p>
                    )}
                </div>

                <div className="flex gap-3 pt-2">
                    <Button 
                        variant="ghost" 
                        className="flex-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowExchangeModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200" 
                        onClick={submitExchange} 
                        disabled={!selectedBuyer}
                    >
                        Confirmar
                    </Button>
                </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetailPage;