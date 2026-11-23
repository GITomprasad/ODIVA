"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Leaf,
  MapPin,
  Sparkles,
  ChefHat,
  ChevronRight,
  Star,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/data/products";
import { RECIPES } from "@/data/recipes";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const [selectedQty, setSelectedQty] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return notFound();
  }

  const isWishlisted = isInWishlist(product.id);
  const cartItem = items.find((i) => i.product.id === product.id);

  // Similar products in same category
  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  // Related recipes that use this product
  const relatedRecipes = RECIPES.filter((r) =>
    r.ingredients.some((ing) => ing.productId === product.id)
  );

  const handleAdd = () => {
    addToCart(product, selectedQty);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-odiva-forest">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-odiva-forest">
          {product.category.replace("-", " ")}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-odiva-dark font-bold truncate">{product.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Media Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-odiva-border shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-odiva-red text-white text-xs font-black px-3 py-1 rounded-xl shadow-md uppercase">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Purchase Details */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-odiva-forest uppercase bg-odiva-cream px-2.5 py-1 rounded-lg">
                {product.category.replace("-", " ")}
              </span>
              {product.isOdishaSpecial && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Odisha Native Special</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              {product.name}
            </h1>
            <p className="text-base font-bold text-odiva-orange mt-1">
              {product.odiaName}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
              <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{product.rating}</span>
              </div>
              <span className="text-gray-400">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-4 bg-odiva-cream/50 rounded-2xl border border-odiva-border flex items-baseline gap-3">
            <span className="text-3xl font-black text-odiva-forest">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-gray-500 font-semibold">
              (Pack size: {product.packSize})
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <p>{product.description}</p>
            {product.odiaDescription && (
              <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl border border-gray-100">
                &ldquo;{product.odiaDescription}&rdquo;
              </p>
            )}
          </div>

          {/* Origin Verification */}
          {product.districtOrigin && (
            <div className="p-3 bg-white rounded-2xl border border-odiva-border shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-odiva-orange flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-odiva-dark">
                  Verified District of Origin: {product.districtOrigin}, Odisha
                </h4>
                <p className="text-[11px] text-gray-500">
                  Directly sourced from local cooperatives & verified farmer groups.
                </p>
              </div>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center bg-gray-100 rounded-2xl p-1.5 border border-gray-200">
                <button
                  onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-gray-700 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-black text-odiva-dark">
                  {selectedQty}
                </span>
                <button
                  onClick={() => setSelectedQty((q) => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-gray-700 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                disabled={!product.isAvailable || product.stock <= 0}
                className="flex-1 py-3.5 bg-gradient-to-r from-odiva-forest to-emerald-800 hover:from-emerald-800 hover:to-odiva-forest text-white rounded-2xl font-bold text-sm shadow-md transition active:scale-98 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {addedToast
                    ? "Added to Basket!"
                    : `Add to Cart • ${formatPrice(product.price * selectedQty)}`}
                </span>
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition shadow-xs ${
                  isWishlisted
                    ? "bg-rose-50 text-odiva-red border-rose-200"
                    : "bg-white text-gray-400 hover:text-odiva-red border-odiva-border hover:bg-odiva-cream"
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-odiva-red" : ""}`} />
              </button>
            </div>

            {/* Delivery Assurance */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pt-3">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-odiva-forest" />
                <span>Express 30-60 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Purity & Freshness Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="bg-odiva-cream/50 rounded-3xl p-6 md:p-8 border border-odiva-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-odiva-dark flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-odiva-orange" />
                <span>Cook with this: Related Odia Recipes</span>
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Traditional dishes featuring {product.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                className="p-4 bg-white rounded-2xl border border-odiva-border shadow-xs hover:shadow-card transition flex items-center gap-4 group"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-odiva-dark group-hover:text-odiva-forest truncate">
                    {recipe.name}
                  </h4>
                  <p className="text-xs text-odiva-orange font-semibold">{recipe.odiaName}</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    ⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins • {recipe.difficulty}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-black text-odiva-dark">You May Also Need</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
