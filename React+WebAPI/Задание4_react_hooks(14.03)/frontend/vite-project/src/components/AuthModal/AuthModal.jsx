// components/AuthModal/AuthModal.jsx
import { useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function AuthModal() {
  const { isModalOpen, closeModal, login } = useAuth();
  console.log('👁️ AuthModal render, isModalOpen:', isModalOpen);

  if (!isModalOpen) {
    return null;
  }
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    username: '', 
    rememberMe: false 
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { email, password } = formData;
    if (!email || !password) {
      setError('Email и пароль обязательны');
      setLoading(false);
      return;
    }

    try {
      const result = await login({
        email,
        password,
        username: formData.username || undefined,
        rememberMe: formData.rememberMe,
      });

      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('Ошибка при входе');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }, [formData, login]);

  return (
    <div 
      className="auth-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div style={{
        background: 'white',
        padding: '30px',
        width: '500px',
        maxWidth: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative', 
      }}>
        <button 
          onClick={closeModal}
          style={{
            position: 'absolute',top: '10px',right: '15px',background: 'none',border: 'none',fontSize: '24px',cursor: 'pointer',color: '#999'
          }}
        >
          &times; 
        </button>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', marginTop: '10px' }}>
            <input
              type="text"
              name="username"
              placeholder="Имя"
              value={formData.username}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', marginBottom: '10px', boxSizing: 'border-box' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', marginBottom: '10px', boxSizing: 'border-box' }}
            />
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'block', textAlign: 'right', color: '#007bff', fontSize: '14px', marginTop: '5px', textDecoration: 'none' }}>
              Не помню пароль
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '15px 0' }}>
            <input
              type="checkbox"
              id="remember-me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              style={{ width: '18px', height: '18px', marginRight: '8px' }}
            />
            <label htmlFor="remember-me" style={{ fontSize: '14px', color: '#666', cursor: 'pointer' }}>
              Запомнить меня
            </label>
          </div>

          {error && <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',padding: '14px',background: loading ? '#ccc' : '#FFD700',color: '#333',border: 'none',borderRadius: '8px',fontSize: '16px',fontWeight: 'bold',marginBottom: '15px',cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;