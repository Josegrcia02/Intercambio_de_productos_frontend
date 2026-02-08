import React from 'react';
import { MessageCircle, MapPin } from "lucide-react";

//
export function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img
          src={product.image || "https://via.placeholder.com/400"} 
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {product.category || "General"}
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="mb-1 font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs">{product.location || "Ubicación"}</span>
          </div>
          <button className="text-blue-600 hover:text-blue-800">
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}