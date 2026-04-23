import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Si no hay usuario, redirigir al Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, dejar pasar (Outlet renderiza la ruta hija)
  return <Outlet />;
};