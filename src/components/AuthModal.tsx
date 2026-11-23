"use client";

import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim()) {
      setErrorMsg("Please enter email address.");
      return;
    }
    setIsLoading(true);
    try {
      await login(email, "customer", fullName || undefined);
    } catch {
      setErrorMsg("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: "customer" | "admin") => {
    setIsLoading(true);
    try {
      if (role === "admin") {
        await login("admin@odiva.in", "admin", "ODIVA Head Admin (BBSR)");
      } else {
        await login("soumya.dash@example.com", "customer", "Soumya Ranjan Dash");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-odiva-forest text-white flex items-center justify-center font-black text-sm">
              ଓ
            </div>
            <h3 className="font-extrabold text-lg text-odiva-dark">
              {mode === "login"
                ? language === "or"
                  ? "ଓଡ଼ିଭା ରେ ଲଗ୍ ଇନ୍ କରନ୍ତୁ"
                  : "Welcome to ODIVA"
                : language === "or"
                ? "ନୂଆ ଆକାଉଣ୍ଟ ଖୋଲନ୍ତୁ"
                : "Create an Account"}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Login Shortcut Buttons */}
        <div className="my-4 p-3 bg-odiva-cream rounded-2xl border border-odiva-border text-xs">
          <p className="font-bold text-odiva-forest mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-odiva-orange" />
            <span>Instant One-Click Test Accounts:</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin("customer")}
              className="px-3 py-2 bg-white hover:bg-odiva-peach rounded-xl font-bold text-odiva-forest border border-odiva-border shadow-xs text-left transition"
            >
              <div className="font-bold">👤 Customer Demo</div>
              <div className="text-[10px] text-gray-400">Soumya (BBSR)</div>
            </button>
            <button
              onClick={() => handleQuickDemoLogin("admin")}
              className="px-3 py-2 bg-odiva-forest hover:bg-emerald-800 text-white rounded-xl font-bold text-left shadow-xs transition"
            >
              <div className="font-bold">🛡️ Admin Portal</div>
              <div className="text-[10px] text-white/80">Full Store Control</div>
            </button>
          </div>
        </div>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400 font-semibold uppercase">
            Or continue with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priyadarshini Mohanty"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-odiva-forest"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email or Phone</label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-odiva-forest"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-odiva-forest"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {errorMsg && <p className="text-xs text-red-500 font-medium">{errorMsg}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-odiva-forest hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow transition mt-2"
          >
            {isLoading
              ? "Authenticating..."
              : mode === "login"
              ? "Sign In to Basket"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          {mode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-odiva-orange font-bold hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-odiva-forest font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
