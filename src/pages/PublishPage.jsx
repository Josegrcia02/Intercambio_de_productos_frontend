import React from 'react';
import { Upload, Camera, X } from 'lucide-react';

const PublishPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Publicar Producto</h1>
      
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Subida de Imágenes */}
        <div>
          <label className="block text-sm font-medium mb-2">Fotos del producto</label>
          <div className="grid grid-cols-3 gap-4">
            <button className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-xs">Añadir foto</span>
            </button>
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium mb-2">Título</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ej: Calculadora Casio casi nueva"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
            placeholder="Describe el estado, tiempo de uso, etc..."
          />
        </div>

        {/* Botón Publicar */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Publicar Anuncio
        </button>
      </div>
    </div>
  );
};

export default PublishPage;