import axios from 'axios';

// Configuración base de Axios
// V1.0: Apunta al backend local.
// V4.0: Aquí cambiaremos esto por una variable de entorno (.env)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;