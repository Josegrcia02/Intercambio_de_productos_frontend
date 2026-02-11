import { createContext, useContext } from 'react';

// 1. Crear el contexto (la caja vacía)
export const AuthContext = createContext(null);

// 2. El Hook para usarlo (la herramienta)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};