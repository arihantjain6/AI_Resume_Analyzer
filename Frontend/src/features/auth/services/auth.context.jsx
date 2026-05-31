import { useState, useEffect } from 'react';
import { getCurrentUserAPI, loginAPI, registerAPI, logoutAPI } from './auth.api';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUserAPI();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginAPI(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerAPI(name, email, password);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await logoutAPI();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
