// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    console.log('🔓 [AuthContext] openModal вызвана');
    setIsModalOpen(true);
  }, []);
  
  const closeModal = useCallback(() => {
    console.log('🔐 [AuthContext] closeModal вызвана');
    setIsModalOpen(false);
  }, []);

  const login = useCallback(async (credentials) => {
    console.log('🔑 [AuthContext] login:', credentials);
    setIsAuthenticated(true);
    setUser({ name: credentials.username || 'Пользователь' });
    closeModal();
    return { success: true };
  }, [closeModal]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const value = {
    isAuthenticated,
    user,
    isModalOpen,
    openModal,
    closeModal,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}