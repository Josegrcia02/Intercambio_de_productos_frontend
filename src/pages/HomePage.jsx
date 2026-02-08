import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { getAllProducts } from '../services/productServices'; // Tu servicio real
import { ProductCard } from '../components/common/ProductCard';

//
const CATEGORIES = ["Todos", "Libros", "Electrónica", "Material", "Accesorios"];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  // Cargar productos de TU API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtrado en el frontend
  const filteredProducts = products.filter((product) => {
    // Ajusta 'title' o 'description' según cómo venga tu JSON de la API
    const title = product.title || product.nombre || ""; 
    const desc = product.description || product.descripcion || "";
    
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Ajusta 'category' según tu API
    const prodCat = product.category || product.categoria || "Otros";
    const matchesCategory =
      selectedCategory === "Todos" || prodCat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col bg-gray-50 min-h-screen">
      {/* Header Azul */}
      <div className="bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Buscar Productos</h1>
        <div className="flex gap-2 max-w-2xl">
          <div className="flex-1 relative text-gray-800">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filtros Desplegables */}
      {showFilters && (
        <div className="bg-white p-4 border-b border-gray-200 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3 max-w-2xl">
            <h3 className="font-medium text-gray-700">Categorías</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 max-w-2xl">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid de Productos */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Prueba con otros términos de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => console.log("Ver detalle", product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;