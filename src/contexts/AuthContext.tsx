"use client";
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type UserRole = "parent" | "contributor" | "admin" | "superadmin";
export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('calendarofcamps_user') : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('calendarofcamps_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('calendarofcamps_user', JSON.stringify(userData));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('calendarofcamps_user');
      localStorage.removeItem('calendarofcamps_subscription'); // Also clear subscription info on logout
    }
  }, []);
  
  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...userData };
      if (typeof window !== 'undefined') {
        localStorage.setItem('calendarofcamps_user', JSON.stringify(updatedUser));
      }
      return updatedUser;
    });
  }, []);


  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
