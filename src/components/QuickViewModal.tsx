"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, Heart, ShoppingCart, Sparkles, Check, MapPin } from "lucide-react";
import { Product } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-700 bg-white/80 hover:bg-white rounded-full transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-gray-50 overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-odiva-red text-white text-xs font-black px-2.5 py-1 rounded-lg shadow">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold text-odiva-forest uppercase tracking-wider bg-odiva-cream px-2 py-0.5 rounded-md">
                  {product.category.replace("-", " ")}
                </span>
                {product.districtOrigin && (
                  <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-odiva-orange" />
                    <span>{product.districtOrigin}</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-gray-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-sm font-bold text-odiva-orange mt-0.5">
                {product.odiaName}
              </p>

              <div className="flex items-baseline gap-2 my-3">
                <span className="text-2xl font-black text-odiva-forest">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-semibold">
                  / {product.packSize}
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                {language === "or" && product.odiaDescription
                  ? product.odiaDescription
                  : product.description}
              </p>

              <div className="mt-3 text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>
                  {product.stock > 0
                    ? `In Stock (${product.stock} units available)`
                    : "Currently Out of Stock"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-gray-600 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-black text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-gray-600 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 ${
                    added
                      ? "bg-emerald-600 text-white"
                      : "bg-odiva-forest hover:bg-emerald-800 text-white"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{added ? "Added to Basket!" : `Add to Cart • ${formatPrice(product.price * quantity)}`}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-2xl border transition shadow-xs ${
                    isWishlisted
                      ? "bg-rose-50 text-odiva-red border-rose-200"
                      : "bg-gray-50 text-gray-400 hover:text-odiva-red border-gray-200 hover:bg-white"
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-odiva-red" : ""}`} />
                </button>
              </div>

              <div className="text-center">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="text-xs font-bold text-odiva-orange hover:underline"
                >
                  View full product specifications & recipes →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
