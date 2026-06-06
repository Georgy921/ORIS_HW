// src/hooks/useAuth.js
import { useState, useCallback } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const login = useCallback(async (credentials) => {
    console.log('Login:', credentials);
    setIsAuthenticated(true);
    setUser({ name: credentials.username || 'Пользователь' });
    closeModal();
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return {
    isAuthenticated,
    user,
    isModalOpen,
    openModal,
    closeModal,
    login,
    logout,
  };
}