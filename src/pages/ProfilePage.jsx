import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Asumiendo que tienes este contexto

const ProfilePage = () => {
  const { logout, user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
      
      {/* Tarjeta de Usuario */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.name || "Estudiante"}</h2>
          <p className="text-gray-500">{user?.email || "usuario@ies.edu"}</p>
        </div>
      </div>

      {/* Menú de Opciones */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 text-left">
          <Settings className="w-5 h-5 text-gray-500" />
          <span>Configuración de cuenta</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 p-4 hover:bg-red-50 text-red-600 text-left transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;