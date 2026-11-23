"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: "customer" | "admin";
  city: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, role?: "customer" | "admin", name?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check saved session
    const saved = localStorage.getItem("odiva_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: "customer" | "admin" = "customer", name?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        fullName: name || (role === "admin" ? "ODIVA Admin (Bhubaneswar)" : email.split("@")[0]),
        phone: "+91 94371 88990",
        role,
        city: "Bhubaneswar",
      };
      setUser(newUser);
      localStorage.setItem("odiva_user", JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem("odiva_user");
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("odiva_user", JSON.stringify(updated));
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        isLoading,
        login,
        logout,
        updateProfile,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
