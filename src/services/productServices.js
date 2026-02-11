import api from './api';

// --- 1. LEER PRODUCTOS (Para el Home) ---
export const getAllProducts = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return [];
  }
};

// --- 2. LEER UN PRODUCTO (Para el Detalle) ---
export const getProductById = async (id) => {

    const response = await api.get(`/productos/${id}`);
    return response.data;
};

// --- 3. LEER CATEGORÍAS ---
export const getCategories = async () => {
  try {
    const response = await api.get('/categorias');
    return response.data;
  } catch (error) {
    console.error("Error cargando categorías:", error);
    return [];
  }
};

// --- 4. CREAR PRODUCTO ---
export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    
    formData.append('titulo', productData.title);
    formData.append('descripcion', productData.description);
    formData.append('precio', productData.price.toString().replace(',', '.'));
    
    if (productData.categoryId) {
        formData.append('categoria', parseInt(productData.categoryId)); 
    }

    // productData.images debe ser un array de archivos (File[])
    if (productData.images && productData.images.length > 0) {
        productData.images.forEach((file) => {
            // Usamos la misma clave 'uploaded_images' para todas.
            // Django getlist('uploaded_images') las recogerá todas.
            formData.append('uploaded_images', file);
        });
    }

    const response = await api.post('/productos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error creando producto:", error);
    throw error;
  }
};

export const sendMessage = async (messageData) => {
  // messageData debe tener: { receptor: id, producto: id, contenido: "hola..." }
  const response = await api.post('/mensajes', messageData);
  return response.data;
};

// --- 6. MARCAR COMO INTERCAMBIADO ---
export const markAsExchanged = async (productId) => {
    try {
        const response = await api.post(`/productos/${productId}/marcar_intercambiado`);
        return response.data;
    } catch (error) {
        console.error("Error finalizando intercambio:", error);
        throw error;
    }
};

// --- 7. Eliminar producto (Soft delete) ---
export const deleteProduct = async (id) => {
    try {
        await api.delete(`/productos/${id}`);
        return true;
    } catch (error) {
        console.error("Error eliminando producto:", error);
        throw error;
    }
};

// --- 8. OBTENER PRECIO SUGERIDO ---
export const getSuggestedPrice = async (categoryId) => {
  try {
    // Llamamos al endpoint que ya creaste en Django
    const response = await api.get(`/productos/sugerir_precio?categoria_id=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo sugerencia:", error);
    return null;
  }
};