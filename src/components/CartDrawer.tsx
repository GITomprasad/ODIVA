"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { language, t } = useLanguage();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    deliveryCharge,
    discount,
    total,
    appliedCoupon,
    couponMessage,
    applyCoupon,
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = 299;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-odiva-cream">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-odiva-forest" />
            <h2 className="font-bold text-base text-odiva-dark">
              {t.cart.title} ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 text-xs">
          <div className="flex items-center justify-between font-semibold text-emerald-950 mb-1.5">
            <span>
              {subtotal >= freeDeliveryThreshold
                ? t.cart.freeDeliveryAchieved
                : `Add ${formatPrice(remainingForFree)} more for FREE Delivery`}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-odiva-cream flex items-center justify-center text-odiva-orange">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-gray-800">{t.cart.emptyTitle}</h3>
              <p className="text-xs text-gray-400 max-w-xs">{t.cart.emptySub}</p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="mt-2 px-6 py-2.5 bg-odiva-forest text-white rounded-full font-bold text-xs shadow hover:bg-emerald-800 transition"
              >
                {t.cart.startShopping}
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-2xl border border-gray-100 hover:border-gray-200 transition"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border bg-white flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-gray-900 truncate">
                    {language === "or" ? product.odiaName : product.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {product.packSize} • {formatPrice(product.price)} each
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-white border border-gray-200 rounded-full p-0.5 shadow-xs">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-odiva-forest rounded-full transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2 text-odiva-dark">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-odiva-forest rounded-full transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-xs text-odiva-forest">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white space-y-3">
            {/* Coupon input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Coupon &quot;{appliedCoupon}&quot; applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:underline text-[11px] font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon (e.g. ODIVA100)"
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-xl text-xs uppercase outline-none focus:border-odiva-forest"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-odiva-cream hover:bg-odiva-forest hover:text-white text-odiva-forest border border-odiva-border rounded-xl text-xs font-bold transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMessage && !appliedCoupon && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">{couponMessage}</p>
              )}
            </div>

            {/* Bill Summary */}
            <div className="space-y-1 text-xs text-gray-600 pt-1">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.cart.deliveryFee}</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-[10px]">FREE</span>
                  ) : (
                    formatPrice(deliveryCharge)
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>{t.cart.discount}</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-odiva-dark pt-2 border-t">
                <span>{t.cart.total}</span>
                <span className="text-base text-odiva-forest">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-full py-3 bg-gradient-to-r from-odiva-forest via-emerald-800 to-odiva-forest hover:from-emerald-800 hover:to-odiva-forest text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98"
            >
              <span>{t.cart.proceedCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={clearCart}
              className="w-full text-center text-[11px] text-gray-400 hover:text-red-500 font-medium transition"
            >
              {t.cart.clearCart}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
