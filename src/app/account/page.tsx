"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { dataStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const { user, logout, updateProfile, openAuthModal, isAdmin } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");
  const [nameInput, setNameInput] = useState(user?.fullName || "");
  const [phoneInput, setPhoneInput] = useState(user?.phone || "");
  const [savedMsg, setSavedMsg] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-odiva-cream flex items-center justify-center text-odiva-forest mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-odiva-dark">Please Sign In to View Account</h2>
        <p className="text-xs text-gray-500">
          Track your active grocery deliveries, manage addresses, and view order receipts.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-2.5 bg-odiva-forest text-white rounded-full text-xs font-bold shadow hover:bg-emerald-800 transition"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const allOrders = dataStore.getOrders();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName: nameInput, phone: phoneInput });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Account Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-odiva-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-odiva-forest to-emerald-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-odiva-dark">{user.fullName}</h1>
              {isAdmin && (
                <span className="bg-odiva-turmeric text-odiva-dark px-2 py-0.5 rounded text-[10px] font-black uppercase">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{user.email} • {user.phone}</p>
            <p className="text-[11px] text-odiva-forest font-bold mt-0.5">
              Primary City: {user.city}, Odisha
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2 bg-odiva-turmeric hover:bg-yellow-400 text-odiva-dark rounded-xl text-xs font-bold shadow-xs transition"
            >
              Open Admin Dashboard
            </Link>
          )}

          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-odiva-border space-x-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === "orders"
              ? "border-odiva-forest text-odiva-forest"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({allOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === "profile"
              ? "border-odiva-forest text-odiva-forest"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          <User className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>

        <button
          onClick={() => setActiveTab("addresses")}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-1.5 ${
            activeTab === "addresses"
              ? "border-odiva-forest text-odiva-forest"
              : "border-transparent text-gray-400 hover:text-gray-700"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* Tab: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {allOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 border border-odiva-border shadow-xs hover:shadow-card transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-odiva-dark">
                      {ord.orderNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-odiva-cream text-odiva-forest">
                      {ord.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Ordered: {new Date(ord.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-base text-odiva-forest">
                    {formatPrice(ord.total)}
                  </span>
                  <Link
                    href={`/orders/${ord.orderNumber}`}
                    className="px-4 py-1.5 bg-odiva-forest text-white rounded-xl text-xs font-bold shadow-2xs hover:bg-emerald-800 transition"
                  >
                    Track Order
                  </Link>
                </div>
              </div>

              {/* Items Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {ord.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="truncate">
                      <span className="font-bold text-gray-800 truncate block">
                        {item.productName}
                      </span>
                      <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Profile */}
      {activeTab === "profile" && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm max-w-xl space-y-4"
        >
          <h2 className="font-black text-base text-odiva-dark">Personal Information</h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email (Account)</label>
            <input
              type="text"
              disabled
              value={user.email}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs text-gray-500"
            />
          </div>

          {savedMsg && (
            <p className="text-xs text-emerald-600 font-bold">Profile updated successfully!</p>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-odiva-forest text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-800 transition"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Tab: Addresses */}
      {activeTab === "addresses" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          <div className="bg-white rounded-3xl p-5 border-2 border-odiva-forest shadow-xs relative space-y-2">
            <span className="bg-odiva-forest text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">
              Default Delivery Address
            </span>
            <h3 className="font-black text-sm text-odiva-dark mt-2">{user.fullName}</h3>
            <p className="text-xs text-gray-600">Plot 104, Saheed Nagar, Near Maharshi College</p>
            <p className="text-xs text-gray-800 font-bold">Bhubaneswar, Odisha - 751007</p>
            <p className="text-xs text-gray-500">Phone: {user.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}
