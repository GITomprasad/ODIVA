"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChefHat, Clock, Sparkles, ChevronRight, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { RECIPES } from "@/data/recipes";
import { PRODUCTS } from "@/data/products";

export default function RecipesPage() {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Traditional Meals", "Curries & Dal", "Pitha & Sweets", "Breakfast & Tiffin"];

  const filtered = selectedCategory === "All"
    ? RECIPES
    : RECIPES.filter((r) => r.category === selectedCategory);

  const handleAddAllIngredients = (recipe: typeof RECIPES[0]) => {
    recipe.ingredients.forEach((ing) => {
      if (ing.productId) {
        const prod = PRODUCTS.find((p) => p.id === ing.productId);
        if (prod) addToCart(prod, 1);
      }
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <ChefHat className="w-4 h-4 text-odiva-turmeric" />
            <span>Ama Odisha Kitchen</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {language === "or"
              ? "ଆଜି କଣ ରନ୍ଧା ହେବ? (Aji Kana Randa Haba?)"
              : "Aji Kana Randa Haba? Authentic Odia Recipes"}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
            {language === "or"
              ? "ଡାଲମା, ପଖାଳ, ବେସର, ଚକୁଳି ଓ ଛେନାପୋଡ଼ ପରି ୧୬+ ପାରମ୍ପରିକ ଓଡ଼ିଆ ରୋଷେଇ ଶିଖନ୍ତୁ ଏବଂ ୧-କ୍ଲିକ୍ ରେ ସମସ୍ତ ସାମଗ୍ରୀ କିଣନ୍ତୁ।"
              : "Cook authentic Pakhala, Dalma, Besara, and festive pithas at home. Every recipe is linked to our real grocery catalogue with 1-click basket checkout."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-odiva-forest text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-odiva-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl border border-odiva-border overflow-hidden shadow-sm hover:shadow-card transition flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-odiva-forest shadow">
                  {recipe.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                  ⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-odiva-dark group-hover:text-odiva-forest transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-xs font-bold text-odiva-orange mt-0.5">
                    {recipe.odiaName}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="text-xs font-bold text-odiva-forest hover:text-odiva-orange transition flex items-center gap-1"
                  >
                    <span>View Recipe</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleAddAllIngredients(recipe)}
                    className="px-3 py-1.5 bg-odiva-cream hover:bg-odiva-forest hover:text-white text-odiva-forest border border-odiva-border rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Get Ingredients</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
