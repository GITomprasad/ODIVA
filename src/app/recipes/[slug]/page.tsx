"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ChefHat,
  Clock,
  Users,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { RECIPES } from "@/data/recipes";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const recipe = RECIPES.find((r) => r.slug === slug || r.id === slug);
  const [servings, setServings] = useState<number>(recipe?.servings || 4);
  const [addedAllToast, setAddedAllToast] = useState(false);

  if (!recipe) {
    return notFound();
  }

  // Calculate estimated retail shopping basket cost for missing ingredients
  const linkedProducts = recipe.ingredients
    .map((ing) => (ing.productId ? PRODUCTS.find((p) => p.id === ing.productId) : null))
    .filter(Boolean) as typeof PRODUCTS;

  const estimatedBasketCost = linkedProducts.reduce((acc, p) => acc + p.price, 0);

  const handleAddAll = () => {
    linkedProducts.forEach((p) => addToCart(p, 1));
    setAddedAllToast(true);
    setTimeout(() => setAddedAllToast(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
        <Link href="/" className="hover:text-odiva-forest">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/recipes" className="hover:text-odiva-forest">
          Recipes
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-odiva-dark font-bold truncate">{recipe.name}</span>
      </nav>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 md:p-8 border border-odiva-border shadow-sm">
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-odiva-cream text-odiva-forest text-xs font-bold border border-odiva-border">
            <ChefHat className="w-3.5 h-3.5 text-odiva-orange" />
            <span>{recipe.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-odiva-dark tracking-tight">
            {recipe.name}
          </h1>
          <p className="text-base font-bold text-odiva-orange">
            {recipe.odiaName}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            {language === "or" ? recipe.odiaDescription : recipe.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Prep Time</span>
              <span className="text-sm font-black text-odiva-dark">{recipe.prepTimeMinutes} mins</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Cook Time</span>
              <span className="text-sm font-black text-odiva-dark">{recipe.cookTimeMinutes} mins</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Difficulty</span>
              <span className="text-sm font-black text-odiva-forest">{recipe.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-gray-100">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Interactive Ingredients and Retail Grocery Cart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Servings Scaler & Ingredients List */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-black text-odiva-dark">
                {language === "or" ? "ଆବଶ୍ୟକୀୟ ରାସନ ସାମଗ୍ରୀ" : "Required Recipe Ingredients"}
              </h2>
              <p className="text-xs text-gray-500">
                Quantities scale automatically as you change servings
              </p>
            </div>

            {/* Serving Adjuster Stepper */}
            <div className="flex items-center gap-2 bg-odiva-cream p-1.5 rounded-2xl border border-odiva-border">
              <span className="text-xs font-bold text-odiva-forest px-1">Servings:</span>
              <button
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                className="w-7 h-7 bg-white hover:bg-odiva-peach rounded-xl flex items-center justify-center font-bold shadow-2xs text-gray-700"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-sm text-odiva-dark">{servings}</span>
              <button
                onClick={() => setServings((s) => s + 1)}
                className="w-7 h-7 bg-white hover:bg-odiva-peach rounded-xl flex items-center justify-center font-bold shadow-2xs text-gray-700"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* List of Ingredients */}
          <div className="space-y-3">
            {recipe.ingredients.map((ing, idx) => {
              const scaledAmount = Number(
                ((ing.amount / recipe.servings) * servings).toFixed(1)
              );
              const matchedProduct = ing.productId
                ? PRODUCTS.find((p) => p.id === ing.productId)
                : null;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-odiva-cream/50 rounded-2xl border border-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-xs font-bold text-odiva-forest border border-gray-200 shadow-2xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-odiva-dark">
                        {language === "or" ? ing.odiaName : ing.name}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Recipe portion:{" "}
                        <strong className="text-odiva-forest">
                          {scaledAmount} {ing.unit}
                        </strong>
                      </p>
                    </div>
                  </div>

                  {matchedProduct ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-bold text-gray-800 block">
                          {formatPrice(matchedProduct.price)}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Pack: {matchedProduct.packSize}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(matchedProduct, 1)}
                        className="px-3 py-1.5 bg-odiva-forest hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-2xs transition flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Pack</span>
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-gray-400 font-medium italic">
                      Pantry item
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 1-Click Buy All Missing Ingredients */}
          <div className="pt-4 border-t border-gray-100 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-gray-500 font-semibold block">
                Estimated Retail Grocery Basket:
              </span>
              <span className="text-xl font-black text-odiva-forest">
                {formatPrice(estimatedBasketCost)}
              </span>
              <span className="text-[10px] text-gray-400 ml-1">
                ({linkedProducts.length} full grocery packs)
              </span>
            </div>

            <button
              onClick={handleAddAll}
              className="px-6 py-3 bg-odiva-forest hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{addedAllToast ? "All Added to Cart!" : "Add All Ingredients to Cart"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Step-by-Step Cooking Instructions */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-black text-odiva-dark">
              {language === "or" ? "ରାନ୍ଧିବାର ପ୍ରଣାଳୀ" : "Step-by-Step Instructions"}
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Traditional homestyle cooking method
            </p>
          </div>

          <div className="space-y-4">
            {recipe.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-odiva-orange text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  {idx + 1}
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 font-medium">
            💡 <strong>Chef&apos;s Pro Tip:</strong> Always use cold-pressed Kachi Ghani mustard oil
            and freshly roasted whole cumin powder for that signature fragrant Odia temple aroma!
          </div>
        </div>
      </div>
    </div>
  );
}
