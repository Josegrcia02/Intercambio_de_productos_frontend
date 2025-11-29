import api from './api';

// Servicio para gestionar productos
// Tu compañero usará estas funciones en las páginas

export const getAllProducts = async () => {
  // Llama a GET /api/productos/
  const response = await api.get('/productos/');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/productos/${id}/`);
  return response.data;
};