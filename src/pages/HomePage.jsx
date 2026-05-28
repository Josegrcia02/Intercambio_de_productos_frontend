import React, { useState, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/common/ProductCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

// Importamos ambas funciones del servicio
import { getAllProducts, getCategories } from '../services/productServices';

const HomePage = () => {
  const navigate = useNavigate();

  // Estados
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Todos"]);
  const [loading, setLoading] = useState(true);
  
  // Estados de filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState("none");
  const [customMinPrice, setCustomMinPrice] = useState(0);
  const [customMaxPrice, setCustomMaxPrice] = useState(1200);
  const [customMinInput, setCustomMinInput] = useState("0");
  const [customMaxInput, setCustomMaxInput] = useState("1200");

  useEffect(() => {
    setCustomMinInput(String(customMinPrice));
  }, [customMinPrice]);

  useEffect(() => {
    setCustomMaxInput(String(customMaxPrice));
  }, [customMaxPrice]);

  // --- FUNCIÓN HELPER PARA IMÁGENES (Sirve para productos y usuarios) ---
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  // --- CARGA DE DATOS ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Cargamos Productos y Categorías
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories()
        ]);

        // 2. Preparamos las categorías (Mapa ID -> Nombre)
        const categoryMap = {};
        const categoryNames = ["Todos"];

        if (Array.isArray(categoriesData)) {
          categoriesData.forEach(cat => {
            categoryMap[cat.id] = cat.nombre;
            categoryNames.push(cat.nombre);
          });
        }
        setCategories(categoryNames);

        // 3. Mapeamos los productos
        const mappedProducts = productsData.map(item => {
          
          // A. FOTO DEL PRODUCTO
          let mainImage = null;
          if (item.imagenes && item.imagenes.length > 0) {
             mainImage = item.imagenes[0].imagen; 
          } else if (item.imagen) {
             mainImage = item.imagen; 
          }

          // B. FOTO DEL USUARIO
          // Procesamos la foto de perfil igual que la del producto
          let sellerProfilePic = null;
          if (item.usuario && item.usuario.foto_perfil) {
            sellerProfilePic = getImageUrl(item.usuario.foto_perfil);
          }

          return {
            id: item.id,
            title: item.titulo,
            description: item.descripcion,
            price: parseFloat(item.precio),
            
            // Imagen del producto procesada
            image: getImageUrl(mainImage), 
            
            category: categoryMap[item.categoria] || "General", 
            
            // DATOS DEL VENDEDOR ACTUALIZADOS
            sellerName: item.usuario ? (item.usuario.alias || item.usuario.username): "Anónimo",
            sellerImage: sellerProfilePic, // Pasamos la URL ya arreglada
            
            createdAt: item.fecha_publicacion
          };
        });

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const matchedProducts = products.filter((product) => {
    const matchesSearch = 
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const minPrice = customMinPrice === null ? 0 : customMinPrice;
    const matchesPrice =
      priceFilter === "free"
        ? product.price === 0
        : priceFilter === "paid"
        ? product.price > 0
        : priceFilter === "custom"
        ? product.price >= minPrice && product.price <= customMaxPrice
        : true;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const filteredProducts = [...matchedProducts];

  // --- RENDERIZADO ---
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="mt-4 text-gray-500">Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-muted/30 min-h-[calc(100vh-4rem)]">
      {/* 1. Header Azul */}
      <div className="bg-blue-600 p-6 shadow-md">
        <h1 className="text-2xl font-bold text-white mb-4">Buscar Productos</h1>
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            className={`shrink-0 ${showFilters ? 'bg-blue-800 text-white' : 'bg-white text-blue-600'} hover:bg-gray-100 border-0`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 2. Panel de Filtros */}
      {showFilters && (
        <div className="bg-white p-4 border-b border-gray-200 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Filtrar por categoría</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((catName) => (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === catName
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                {catName}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-900 mb-2">Filtrar por precio</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPriceFilter("free")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  priceFilter === "free"
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                Gratuitos
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter("paid")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  priceFilter === "paid"
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                De pago
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter("custom")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  priceFilter === "custom"
                    ? "bg-blue-600 text-white shadow-md transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                Precio personalizado
              </button>
            </div>

            {priceFilter === "custom" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 items-end">
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Mínimo</label>
                    <input
                      type="number"
                      min="0"
                      max={customMaxPrice - 10}
                      step="10"
                      value={customMinInput}
                      onChange={(e) => {
                        const nextValue = e.target.value;
                        setCustomMinInput(nextValue);

                        if (nextValue === "") {
                          return;
                        }

                        const parsed = Number(nextValue);
                        if (Number.isNaN(parsed)) return;

                        const bounded = Math.min(Math.max(parsed, 0), customMaxPrice - 10);
                        setCustomMinPrice(bounded);
                      }}
                      onBlur={() => {
                        if (customMinInput.trim() === "") {
                          const resetValue = 0;
                          setCustomMinPrice(resetValue);
                          setCustomMinInput(String(resetValue));
                        }
                      }}
                      className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600">Máximo</label>
                    <input
                      type="number"
                      min={customMinPrice + 10}
                      max="1200"
                      step="10"
                      value={customMaxInput}
                      onChange={(e) => {
                        const nextValue = e.target.value;
                        setCustomMaxInput(nextValue);

                        if (nextValue === "") {
                          return;
                        }

                        const parsed = Number(nextValue);
                        if (Number.isNaN(parsed)) return;

                        const bounded = Math.min(Math.max(parsed, customMinPrice + 10), 1200);
                        setCustomMaxPrice(bounded);
                      }}
                      onBlur={() => {
                        if (customMaxInput.trim() === "") {
                          const resetValue = Math.max(customMinPrice + 10, 0);
                          setCustomMaxPrice(resetValue);
                          setCustomMaxInput(String(resetValue));
                        }
                      }}
                      className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3 rounded-3xl border border-gray-200 bg-slate-50 p-4 max-w-3xl mx-auto">
                  <div className="mb-3 flex items-center justify-between gap-3 text-sm text-gray-700">
                    <div className="space-y-1">
                      <p className="uppercase tracking-[0.2em] text-[10px] text-gray-500">Precio mínimo</p>
                      <p className="text-base font-semibold text-gray-900">{customMinPrice} €</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="uppercase tracking-[0.2em] text-[10px] text-gray-500">Precio máximo</p>
                      <p className="text-base font-semibold text-gray-900">{customMaxPrice} €</p>
                    </div>
                  </div>

                  <Slider.Root
                    value={[customMinPrice, customMaxPrice]}
                    min={0}
                    max={1200}
                    step={10}
                    onValueChange={([nextMin, nextMax]) => {
                      const minValue = Math.min(nextMin, nextMax - 10);
                      const maxValue = Math.max(nextMax, nextMin + 10);
                      setCustomMinPrice(minValue);
                      setCustomMaxPrice(maxValue);
                    }}
                    className="relative flex h-10 w-full max-w-[580px] touch-none select-none items-center"
                  >
                    <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
                      <Slider.Range className="absolute h-full bg-blue-600" />
                    </Slider.Track>
                    <Slider.Thumb className="block h-5 w-5 rounded-full border border-white bg-white shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Filtro precio mínimo" />
                    <Slider.Thumb className="block h-5 w-5 rounded-full border border-white bg-white shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Filtro precio máximo" />
                  </Slider.Root>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Grid de Productos */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
            <Search className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-lg font-medium">No se encontraron productos</p>
            <p className="text-sm">Prueba con otra búsqueda o cambia la categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/producto/${product.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;