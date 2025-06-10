import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    role: null,
    user: null,
  });

  useEffect(() => {
    // Load token, role, and user from localStorage on app load
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; // Check if user exists
    setAuthState({ token, role, user });
  }, []);

  const login = (token, role, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
    setAuthState({ token, role, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user'); // Remove user from localStorage
    setAuthState({ token: null, role: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;