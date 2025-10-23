"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSessionAction } from "@/app/actions/session";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  refreshAuth: () => Promise<void>;
  logoutLocal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  refreshAuth: async () => {},
  logoutLocal: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  // Load session once at mount
  useEffect(() => {
    refreshAuth();
  }, []);

  const refreshAuth = async () => {
    try {
      const session = await getSessionAction();
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const logoutLocal = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, refreshAuth, logoutLocal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
