'use client';

import { lutimes } from 'node:fs/promises';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  isLoggedIn: boolean;
  login: (userName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children
}: {
  children: ReactNode;
  }) {
  const [user, setUser] = useState<string | null>(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('user_session');
    return null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user_session', user);
    else localStorage.removeItem('user_session')
  }, [user]);

  const login = (userName: string) => {
    setUser(userName);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}