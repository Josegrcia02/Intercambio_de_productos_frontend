import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, DollarSign, X, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { createProduct, getCategories, getSuggestedPrice } from '../services/productServices';

const PublishPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Estado para la sugerencia de precio
  const [priceSuggestion, setPriceSuggestion] = useState(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    images: []
  });

  // 1. Cargar Categorías al inicio
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // 2. EFECTO: Cuando cambia la categoría, pedimos precio sugerido
  useEffect(() => {
    const fetchSuggestion = async () => {
      if (!formData.categoryId) {
        setPriceSuggestion(null);
        return;
      }

      setLoadingSuggestion(true);
      const suggestion = await getSuggestedPrice(formData.categoryId);
      
      // Solo mostramos sugerencia si hay datos suficientes (precio > 0)
      if (suggestion && suggestion.precio_ideal > 0) {
        setPriceSuggestion(suggestion);
      } else {
        setPriceSuggestion(null);
      }
      setLoadingSuggestion(false);
    };

    fetchSuggestion();
  }, [formData.categoryId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Modificado para evento estándar de HTML
  const handleCategoryChange = (e) => {
    setFormData(prev => ({ ...prev, categoryId: e.target.value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));

      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  // Función para aplicar el precio sugerido
  const applySuggestedPrice = () => {
    if (priceSuggestion) {
      setFormData(prev => ({ ...prev, price: priceSuggestion.precio_ideal }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validación: Permitimos precio 0, pero no vacío
    if (!formData.title || formData.price === "" || !formData.categoryId) {
      alert("Por favor rellena Título, Precio y Categoría (Pon 0 si es para intercambio).");
      return;
    }

    setLoading(true);
    try {
      await createProduct(formData);
      navigate('/perfil'); 
    } catch (error) {
      console.error("Error publicando:", error);
      alert("Error al publicar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl pb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Publicar Anuncio</h1>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          
          {/* TÍTULO */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Título
            </label>
            <Input 
              name="title" 
              placeholder="Ej: Libro de Matemáticas 2º ESO" 
              value={formData.title} 
              onChange={handleChange} 
            />
          </div>

          {/* CATEGORÍA (USANDO SELECT NORMAL DE HTML) */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Categoría
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-200"
              value={formData.categoryId}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* PRECIO + SUGERENCIA INTELIGENTE */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Precio (€)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input 
                type="number" 
                name="price" 
                placeholder="0.00" 
                className="pl-9"
                value={formData.price} 
                onChange={handleChange} 
              />
            </div>
            <p className="text-xs text-muted-foreground">Pon 0 para intercambio o regalo.</p>

            {/* BLOQUE DE SUGERENCIA DE PRECIO */}
            {loadingSuggestion && <p className="text-xs text-blue-500 animate-pulse">Calculando precio ideal...</p>}
            
            {!loadingSuggestion && priceSuggestion && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3 mt-2 animate-in fade-in slide-in-from-top-2">
                <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
                  <Sparkles size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    Sugerencia: {priceSuggestion.precio_ideal}€
                  </p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    Usa este precio si no te ocurre otro.
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={applySuggestedPrice}
                  type="button"
                >
                  Aplicar
                </Button>
              </div>
            )}
          </div>

          {/* DESCRIPCIÓN */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Descripción
            </label>
            <Textarea 
              name="description" 
              placeholder="Detalles del estado, año, etc." 
              className="h-32 resize-none"
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>

          {/* SUBIDA DE IMÁGENES */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Imágenes
            </label>
            <div className="grid grid-cols-3 gap-4">
              <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Upload className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-2">Añadir</span>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </label>
              
              {previewImages.map((src, index) => (
                <div key={index} className="relative h-32 rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={src} alt="preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full h-12 text-lg mt-6" onClick={handleSubmit} disabled={loading}>
            {loading ? "Publicando..." : "Publicar ahora"}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default PublishPage;