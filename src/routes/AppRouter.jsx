import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PublishPage from '../pages/PublishPage';
import MessagesPage from '../pages/MessagesPage';
import ProfilePage from '../pages/ProfilePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AdminPendientesPage from '../pages/AdminPendientesPage';
import AdminEstadisticasPage from '../pages/AdminEstadisticasPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* 1. RUTA PÚBLICA (Fuera del Layout y de la protección) */}
      <Route path="/login" element={<LoginPage />} />

      {/* 2. RUTAS PROTEGIDAS (Solo usuarios logueados) */}
      <Route element={<ProtectedRoute />}>
        
        {/* 3. LAYOUT (Solo se muestra si estás logueado) */}
        <Route element={<Layout />}>
          
          {/* Página Principal */}
          <Route path="/" element={<HomePage />} />
          
          {/* Páginas del Usuario */}
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/publicar" element={<PublishPage />} />
          <Route path="/mensajes" element={<MessagesPage />} />

          {/* Rutas de Detalle de Producto */}
          {/* Mantenemos las dos versiones para evitar errores si mezclaste enlaces */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          
          {/* Admin */}
          <Route path="/admin/pendientes" element={<AdminPendientesPage />} />
          <Route path="/admin/estadisticas" element={<AdminEstadisticasPage />} />
        
        </Route>
      </Route>

      {/* 4. RUTA 404 */}
      {/* Si escriben una ruta rara, los mandamos al Home (y si no tienen login, al Login) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}