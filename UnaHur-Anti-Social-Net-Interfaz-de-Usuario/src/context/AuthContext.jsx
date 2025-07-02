import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al montar: recuperar usuario completo (con id) desde localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  // Guardar usuario completo en localStorage al loguear
  const login = (usuarioData) => {
    // Aseguramos que se guarda el id, además del nickName y email
    const usuarioConId = {
      id: usuarioData.id,
      nickName: usuarioData.nickName,
      email: usuarioData.email,
    };

    setUsuario(usuarioConId);
    localStorage.setItem('usuario', JSON.stringify(usuarioConId));
  };

  // Limpiar sesión
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}