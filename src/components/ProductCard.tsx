"use client";

import React from "react";
import Link from "next/link";
import { Heart, Plus, Minus, Eye, Check, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const cartItem = items.find((i) => i.product.id === product.id);
  const isWishlisted = isInWishlist(product.id);

  // Category badge styles
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "rice-grains":
        return "bg-amber-100 text-amber-900 border-amber-200";
      case "pulses-lentils":
        return "bg-orange-100 text-orange-950 border-orange-200";
      case "fresh-vegetables":
        return "bg-emerald-100 text-emerald-900 border-emerald-200";
      case "fruits":
        return "bg-rose-100 text-rose-900 border-rose-200";
      case "spices-cooking":
        return "bg-teal-100 text-teal-900 border-teal-200";
      case "dairy-essentials":
        return "bg-sky-100 text-sky-950 border-sky-200";
      case "odia-sweets-snacks":
        return "bg-red-100 text-red-950 border-red-200";
      default:
        return "bg-purple-100 text-purple-900 border-purple-200";
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-odiva-border hover:border-odiva-orange/40 shadow-sm hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="bg-odiva-red text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
              {product.discountPercent}% {t.product.off}
            </span>
          ) : null}

          {product.isOdishaSpecial && (
            <span className="bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Odisha Special</span>
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-sm ${
            isWishlisted
              ? "bg-rose-50 text-odiva-red"
              : "bg-white/80 backdrop-blur-sm text-gray-400 hover:text-odiva-red hover:bg-white"
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-odiva-red" : ""}`} />
        </button>
      </div>

      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Quick View Button on hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/95 backdrop-blur-sm text-odiva-forest hover:bg-odiva-forest hover:text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.product.quickView}</span>
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & District Origin */}
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadge(
                product.category
              )}`}
            >
              {product.category.replace("-", " ")}
            </span>
            {product.districtOrigin && (
              <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                📍 {product.districtOrigin}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-odiva-forest">
            <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-odiva-forest transition-colors">
              {product.name}
            </h3>
            <p className="text-xs font-medium text-odiva-orange line-clamp-1 mt-0.5">
              {product.odiaName}
            </p>
          </Link>

          {/* Pack size */}
          <p className="text-xs text-gray-400 mt-1 font-medium">{product.packSize}</p>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-odiva-forest">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block">
              {product.stock > 0 ? t.product.inStock : t.product.outOfStock}
            </span>
          </div>

          {/* Cart Stepper or Add button */}
          {cartItem ? (
            <div className="flex items-center bg-odiva-forest text-white rounded-full p-1 shadow-sm">
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-black px-2">{cartItem.quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              disabled={!product.isAvailable || product.stock <= 0}
              className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-sm transition-all flex items-center gap-1 ${
                product.isAvailable && product.stock > 0
                  ? "bg-odiva-cream hover:bg-odiva-forest text-odiva-forest hover:text-white border border-odiva-forest/20 hover:border-odiva-forest active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.product.addToCart}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
