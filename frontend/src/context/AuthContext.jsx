import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.auth.getMe();
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (usernameOrEmail, password) => {
    setActionLoading(true);
    try {
      const response = await api.auth.login({ username: usernameOrEmail, password });
      // Backend AuthResponse is flat: { token, type, id, username, email, role }
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
    } finally {
      setActionLoading(false);
    }
  };

  const register = async (data) => {
    setActionLoading(true);
    try {
      // Map frontend field 'name' to backend field 'fullName'
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
        fullName: data.name || data.fullName,
      };
      const response = await api.auth.register(payload);
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
    } finally {
      setActionLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    actionLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
