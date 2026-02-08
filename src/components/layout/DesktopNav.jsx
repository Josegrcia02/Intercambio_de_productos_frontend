import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, PlusCircle, MessageSquare, User, Package } from "lucide-react";

//
export function DesktopNav() {
  const location = useLocation();
  const activeTab = location.pathname;

  const navItems = [
    { path: "/", icon: Search, label: "Buscar" },
    { path: "/publicar", icon: PlusCircle, label: "Publicar" },
    { path: "/mensajes", icon: MessageSquare, label: "Mensajes" },
    { path: "/perfil", icon: User, label: "Perfil" },
  ];

  return (
    <div className="hidden md:flex md:flex-col w-64 bg-gray-50 border-r border-gray-200 min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">IntercambioIES</h2>
            <p className="text-xs text-gray-500">Estudiantes</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}