import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  // --- 1. FUNCIÓN LOGOUT MEMORIZADA (useCallback) ---
  // Usamos useCallback para "congelar" la función.
  // Esto evita que el useEffect (que depende de 'logout') entre en bucle infinito.
  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirigir al login al cerrar sesión
    navigate('/login');
  }, [navigate]);

  // --- 2. COMPROBACIÓN DE SESIÓN AL CARGAR ---
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      
      // Si no hay token, paramos la carga y no hacemos nada más
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Intentamos validar el token obteniendo los datos del usuario
        const res = await api.get('/usuarios/me');
        
        // Si el token es válido:
        setUser(res.data);
        setIsAuthenticated(true);
        // Actualizamos los datos en localStorage por si han cambiado
        localStorage.setItem('user_data', JSON.stringify(res.data)); 
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Si el token ha caducado o es inválido:
        console.error("Sesión inválida o caducada al iniciar");
        logout(); // Ahora es seguro llamar a esta función aquí
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [logout]); // Añadimos 'logout' a las dependencias como pedía el aviso

  // --- 3. FUNCIÓN LOGIN ---
  const login = async (username, password) => {
    try {
      // A. Obtener tokens
      const response = await api.post('/token/', { username, password });
      const { access, refresh } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // B. Obtener datos del usuario
      const userResponse = await api.get('/usuarios/me');
      const userData = userResponse.data;
      
      localStorage.setItem('user_data', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      // C. Redirigir al Home
      navigate('/');
      
      return true;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // --- 4. FUNCIÓN LOGIN CON GOOGLE ---
  const loginWithGoogle = async (credential) => {
    try {
      // Enviar el token de Google al backend
      const response = await api.post('/token/google/', { credential });
      const { access, refresh, user: userData } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Redirigir al Home
      navigate('/');
      
      return true;
    } catch (error) {
      console.error("Error en login con Google:", error);
      throw error;
    }
  };

  // Valores que exportamos al resto de la app
  const value = { user, isAuthenticated, loading, login, loginWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};