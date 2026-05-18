import axios from 'axios';

// 1. Crear la instancia de Axios apuntando a tu Backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de Solicitudes (Middleware)
// Antes de enviar cualquier petición, verifica si hay un token guardado.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor de Respuestas
// Si el token expira (Error 401), aquí podríamos cerrar sesión automáticamente.
api.interceptors.response.use(
  (response) => response, // Si todo va bien, deja pasar la respuesta
  (error) => {
    // Si el error es 401 (No autorizado/Token caducado)
    if (error.response && error.response.status === 401) {
      console.warn("Sesión caducada. Redirigiendo al login...");
      
      // Borramos todo rastro del usuario
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      
      // Forzamos la recarga y enviamos al login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;