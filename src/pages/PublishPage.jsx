import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, DollarSign, X, Sparkles, ChevronDown } from 'lucide-react';
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

  // ESTADO SIMPLE PARA ABRIR/CERRAR EL MENÚ
  const [isOpen, setIsOpen] = useState(false);

  const [priceSuggestion, setPriceSuggestion] = useState(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    images: []
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSuggestion = async () => {
      if (!formData.categoryId) {
        setPriceSuggestion(null);
        return;
      }
      setLoadingSuggestion(true);
      const suggestion = await getSuggestedPrice(formData.categoryId);
      
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

  // FUNCIÓN SIMPLE: Eliges categoría y cerramos el menú
  const handleSelectCategory = (cat) => {
    setFormData(prev => ({ ...prev, categoryId: cat.id }));
    setIsOpen(false); 
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

  const applySuggestedPrice = () => {
    if (priceSuggestion) {
      setFormData(prev => ({ ...prev, price: priceSuggestion.precio_ideal }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!formData.title || formData.price === "" || !formData.categoryId) {
      alert("Por favor rellena todos los campos.");
      return;
    }
    setLoading(true);
    try {
      await createProduct(formData);
      navigate('/perfil'); 
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error al publicar.");
    } finally {
      setLoading(false);
    }
  };

  // Buscamos el nombre de la categoría actual para mostrarlo
  const categoryName = categories.find(c => c.id == formData.categoryId)?.nombre || "Selecciona una categoría";

  return (
    <div className="container mx-auto p-4 max-w-2xl pb-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Publicar Anuncio</h1>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          
          {/* TÍTULO */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input 
              name="title" 
              placeholder="Ej: Libro de Matemáticas" 
              className="border border-black"
              value={formData.title} 
              onChange={handleChange} 
            />
          </div>

          {/* --- SELECT --- */}
          <div className="space-y-2 relative">
            <label className="text-sm font-medium">Categoría</label>
            
            {/* 1. LA CAJA QUE SE VE */}
            <div 
                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm cursor-pointer"
                onClick={() => setIsOpen(!isOpen)} // Solo cambia true/false
            >
                <span className={!formData.categoryId ? "text-gray-400" : "text-gray-900"}>
                    {categoryName}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>

            {/* 2. LA LISTA DESPLEGABLE */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {categories.map((cat) => (
                        <div 
                            key={cat.id}
                            className="px-3 py-2.5 text-sm hover:bg-blue-50 cursor-pointer text-gray-700"
                            onClick={() => handleSelectCategory(cat)}
                        >
                            {cat.nombre}
                        </div>
                    ))}
                </div>
            )}
          </div>
          {/* ----------------------------- */}

          {/* PRECIO */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Precio (€)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input 
                type="number" 
                name="price" 
                placeholder="0.00" 
                className="pl-9 border border-black"
                value={formData.price} 
                onChange={handleChange} 
              />
            </div>
            
            {/* SUGERENCIA */}
            {!loadingSuggestion && priceSuggestion && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3 mt-2">
                <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
                  <Sparkles size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    Sugerencia: {priceSuggestion.precio_ideal}€
                  </p>
                </div>
                <Button 
                  size="sm" variant="outline" type="button"
                  className="h-8 text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={applySuggestedPrice}
                >
                  Aplicar
                </Button>
              </div>
            )}
          </div>

          {/* DESCRIPCIÓN */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea 
              name="description" 
              className="h-32 resize-none border border-black"
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>

          {/* IMÁGENES */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Imágenes</label>
            <div className="grid grid-cols-3 gap-4">
              <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-blue-50">
                <Upload className="h-6 w-6 text-gray-400" />
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              
              {previewImages.map((src, index) => (
                <div key={index} className="relative h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img src={src} alt="preview" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1" type="button">
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