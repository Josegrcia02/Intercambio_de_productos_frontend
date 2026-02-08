import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  // Aquí simulamos que ya hay un usuario conectado para que veas el perfil lleno
  const [user, setUser] = useState({ 
    name: "Estudiante Demo", 
    email: "demo@ies.edu" 
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null); // Borramos el usuario al salir
  };

  return (
    // Pasamos los datos (user) y las funciones (login, logout) a toda la app
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;