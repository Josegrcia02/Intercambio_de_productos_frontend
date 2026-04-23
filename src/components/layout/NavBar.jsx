import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      {/* Usamos Link en lugar de <a> para no recargar la página (SPA) */}
      <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
      <Link to="/login">Login (V2)</Link>
    </nav>
  );
}