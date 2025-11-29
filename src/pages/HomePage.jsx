import { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';

export default function HomePage() {
  const [productos, setProductos] = useState([]);

  // Al cargar la página, pedimos los datos a Django
  useEffect(() => {
    getAllProducts()
      .then(data => setProductos(data))
      .catch(error => console.error("Error cargando productos:", error));
  }, []);

  return (
    <div>
      <h1>Catálogo de Libros</h1>
      <div className="grid-productos">
        {productos.map(prod => (
          <div key={prod.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <h3>{prod.titulo}</h3>
            <p>Precio/Estado: {prod.estado}</p>
            {/* Aquí iría el componente ProductCard en el futuro */}
          </div>
        ))}
      </div>
    </div>
  );
}