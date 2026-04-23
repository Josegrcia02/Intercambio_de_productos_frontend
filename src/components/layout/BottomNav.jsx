import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, PlusCircle, MessageSquare, User, ShieldAlert, BarChart3 } from "lucide-react";
import { useAuth } from '../../context/AuthContext';

//
export function BottomNav() {
  const location = useLocation();
  const activeTab = location.pathname;
  const { user } = useAuth();

  const navItems = [
    { path: "/", icon: Search, label: "Buscar" },
    { path: "/publicar", icon: PlusCircle, label: "Publicar" },
    { path: "/mensajes", icon: MessageSquare, label: "Mensajes" },
    { path: "/perfil", icon: User, label: "Perfil" },
  ];

  if (user?.is_staff) {
      navItems.push({ path: "/admin/pendientes", icon: ShieldAlert, label: "Admin" });
      navItems.push({ path: "/admin/estadisticas", icon: BarChart3, label: "Stats" });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}