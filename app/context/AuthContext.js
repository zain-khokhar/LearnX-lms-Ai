
"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Only track user state, no routing logic
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('user'));
      } catch {
        return null;
      }
    }
    return null;
  });
  
  // Update user data in AuthContext when it changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
