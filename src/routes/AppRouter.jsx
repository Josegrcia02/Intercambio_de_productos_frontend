import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
// Importamos las nuevas páginas
import PublishPage from '../pages/PublishPage';
import MessagesPage from '../pages/MessagesPage';
import ProfilePage from '../pages/ProfilePage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Ruta principal (Buscar) */}
        <Route index element={<HomePage />} />
        
        {/* Nuevas rutas añadidas */}
        <Route path="publicar" element={<PublishPage />} />
        <Route path="mensajes" element={<MessagesPage />} />
        <Route path="perfil" element={<ProfilePage />} />
        
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}