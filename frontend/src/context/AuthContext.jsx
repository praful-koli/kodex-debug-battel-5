import  { createContext, useState, useEffect } from 'react';

import instance from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await instance.get('/users/profile');
          console.log("response : " , response)
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await instance.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data);
  };

  const register = async (username, email, password) => {
    const response = await instance.post('/auth/register', { username, email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data);
  };

  const logout = async () => {
    try {
      await instance.post('/auth/logout');
    } catch (e) {
      console.error('Logout error', e);
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
