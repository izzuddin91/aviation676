"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSessionAction } from "@/app/actions/session";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean; // ✅ added
  refreshAuth: () => Promise<void>;
  logoutLocal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true, // ✅ default to true
  refreshAuth: async () => {},
  logoutLocal: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // ✅ state to track loading

  // Run once when component mounts
  useEffect(() => {
    const initAuth = async () => {
      await refreshAuth();
      setLoading(false); // ✅ stop loading after refreshAuth finishes
    };
    initAuth();
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
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, refreshAuth, logoutLocal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
