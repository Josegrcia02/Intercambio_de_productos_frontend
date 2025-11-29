import { AuthContext } from './AuthContext'; // Importamos la "caja" del otro archivo

// Aquí SOLO definimos el componente que envuelve la app
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};