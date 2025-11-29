import { Outlet } from 'react-router-dom';
import Navbar from '/Navbar';

// Este componente envuelve a todas las páginas
// Renderiza siempre la Navbar arriba y el contenido cambiante abajo
export default function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        {/* Outlet es donde se pintan las páginas hijas (Home, Login...) */}
        <Outlet />
      </main>
      <footer>
        <p>© 2025 Intercambio Estudiantil</p>
      </footer>
    </div>
  );
}