"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";
import { ACTIVE_COUPONS } from "@/lib/store";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  appliedCoupon: string | null;
  couponMessage: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("odiva_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem("odiva_coupon");
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch {
      // Ignore JSON error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("odiva_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!product.isAvailable || product.stock <= 0) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        const initialQty = Math.min(product.stock, quantity);
        return [...prev, { product, quantity: initialQty }];
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clampedQty = Math.min(item.product.stock, quantity);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponMessage(null);
    localStorage.removeItem("odiva_coupon");
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Free delivery above ₹299, else standard ₹35
  const deliveryCharge = subtotal >= 299 || subtotal === 0 ? 0 : 35;

  // Coupon calculations
  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    const coupon = ACTIVE_COUPONS.find((c) => c.code === appliedCoupon);
    if (coupon && subtotal >= coupon.minOrder) {
      if (coupon.type === "flat") {
        discount = coupon.value;
      } else {
        discount = Math.round((subtotal * coupon.value) / 100);
        if (coupon.maxDiscount && discount > coupon.maxDiscount) {
          discount = coupon.maxDiscount;
        }
      }
    }
  }

  const total = Math.max(0, subtotal - discount + deliveryCharge);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    const coupon = ACTIVE_COUPONS.find((c) => c.code === clean);
    if (!coupon) {
      setCouponMessage("Invalid coupon code.");
      return false;
    }
    if (subtotal < coupon.minOrder) {
      setCouponMessage(`Add ₹${coupon.minOrder - subtotal} more to use coupon ${coupon.code}`);
      return false;
    }
    setAppliedCoupon(coupon.code);
    setCouponMessage(`Coupon ${coupon.code} applied!`);
    localStorage.setItem("odiva_coupon", coupon.code);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponMessage(null);
    localStorage.removeItem("odiva_coupon");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
