import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PublishPage from '../pages/PublishPage';
import MessagesPage from '../pages/MessagesPage';
import ProfilePage from '../pages/ProfilePage';
import ProductDetailPage from '../pages/ProductDetailPage'; // <--- IMPORTANTE

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        
        {/* Nueva ruta dinámica para el detalle del producto */}
        <Route path="producto/:id" element={<ProductDetailPage />} /> 
        
        <Route path="publicar" element={<PublishPage />} />
        <Route path="mensajes" element={<MessagesPage />} />
        <Route path="perfil" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}