"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { language, t } = useLanguage();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-odiva-border">
        <div>
          <h1 className="text-3xl font-black text-odiva-dark flex items-center gap-2">
            <Heart className="w-7 h-7 text-odiva-red fill-odiva-red" />
            <span>{language === "or" ? "ଆପଣଙ୍କ ପସନ୍ଦ ତାଲିକା" : "My Wishlist"}</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {wishlistedProducts.length} favourite groceries & sweets saved
          </p>
        </div>

        <Link
          href="/shop"
          className="text-xs font-bold text-odiva-forest hover:text-odiva-orange transition flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-odiva-border shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-odiva-red mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Your wishlist is empty</h2>
          <p className="text-xs text-gray-500">
            Save items you love so you can easily add them to your weekly Odisha basket anytime.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-odiva-forest text-white rounded-full text-xs font-bold shadow hover:bg-emerald-800 transition"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
