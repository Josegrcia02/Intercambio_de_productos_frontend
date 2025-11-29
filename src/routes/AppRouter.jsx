import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas envueltas en el Layout principal */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        
        {/* Aquí añadiremos más rutas en el futuro:
            <Route path="productos/:id" element={<ProductDetail />} />
        */}
      </Route>
    </Routes>
  );
}