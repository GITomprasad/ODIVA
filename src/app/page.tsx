"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Clock,
  Truck,
  Leaf,
  ChefHat,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Flame,
  Award,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/context/LocationContext";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { RECIPES } from "@/data/recipes";
import { FESTIVALS } from "@/data/festivals";
import { PRODUCERS } from "@/data/farmers";
import { WASTE_OFFERS } from "@/data/wasteOffers";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { Product, Recipe } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const { language, t } = useLanguage();
  const { selectedCity } = useLocation();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Selected recipe for interactive "Aji Kana Randa Haba?" feature
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0]);
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(4);

  // Slices from the real catalogue
  const freshArrivals = PRODUCTS.filter((p) => p.isFreshArrival || p.category === "fresh-vegetables").slice(0, 8);
  const odishaSpecials = PRODUCTS.filter((p) => p.isOdishaSpecial).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const budgetPicks = PRODUCTS.filter((p) => p.price <= 60).slice(0, 8);

  // Add all recipe ingredients to cart
  const handleAddRecipeToCart = (recipe: Recipe) => {
    recipe.ingredients.forEach((ing) => {
      if (ing.productId) {
        const prod = PRODUCTS.find((p) => p.id === ing.productId);
        if (prod) {
          addToCart(prod, 1);
        }
      }
    });
  };

  const reviews = [
    {
      id: "rev-1",
      name: "Trupti Mayee Sahoo",
      city: "Saheed Nagar, Bhubaneswar",
      rating: 5,
      date: "2 days ago",
      comment:
        "The Nayagarh Chhena Poda arrived warm and smelling authentically of sal leaves! And the Keonjhar Phula Badi fried up so crunchy for our Badi Chura. ODIVA is a blessing for Odia families.",
    },
    {
      id: "rev-2",
      name: "Debabrata Rath",
      city: "CDA Sector 9, Cuttack",
      rating: 5,
      date: "Yesterday",
      comment:
        "I was tired of getting generic vegetables from other apps. Here the Potala, Sajana Chhuin, and Kancha Kadali were so tender and fresh. Delivered within 40 minutes in Cuttack!",
    },
    {
      id: "rev-3",
      name: "Manini Patnaik",
      city: "VIP Road, Puri",
      rating: 5,
      date: "3 days ago",
      comment:
        "The recipe section 'Aji Kana Randa Haba?' is genius. Clicked once and all the Dalma vegetables and yellow moong dal were in my basket with the exact quantity. Super convenient!",
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-odiva-cream via-odiva-peach/30 to-white py-10 md:py-16 border-b border-odiva-border/60">
        {/* Subtle decorative Sambalpuri-inspired background dots */}
        <div className="absolute inset-0 opacity-15 bg-sambalpuri-pattern pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-odiva-cream border border-odiva-turmeric text-odiva-forest font-bold text-xs shadow-xs">
                <span className="w-2 h-2 rounded-full bg-odiva-orange animate-ping" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-odiva-dark leading-[1.12]">
                {t.hero.title}{" "}
                <span className="bg-gradient-to-r from-odiva-forest via-emerald-700 to-odiva-orange bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/shop"
                  className="px-7 py-3.5 bg-gradient-to-r from-odiva-forest to-emerald-800 hover:from-emerald-800 hover:to-odiva-forest text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center gap-2 group"
                >
                  <span>{t.hero.shopNow}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/odisha-specials"
                  className="px-6 py-3.5 bg-white hover:bg-odiva-cream text-odiva-red hover:text-odiva-dark border border-odiva-red/30 rounded-full font-bold text-sm shadow-xs transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-odiva-orange" />
                  <span>{t.hero.exploreSpecials}</span>
                </Link>
              </div>

              {/* Express delivery pill in chosen city */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600">
                <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-odiva-border shadow-2xs">
                  <Truck className="w-4 h-4 text-odiva-forest" />
                  <span>
                    {language === "or"
                      ? `${selectedCity.odiaName}ରେ ୩୦-୬୦ ମିନିଟ୍ ଡେଲିଭରୀ`
                      : `30-60 Min Delivery in ${selectedCity.name}`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-odiva-border shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-odiva-green" />
                  <span>30 Odisha Districts Sourced</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Backdrop Glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-odiva-turmeric/40 via-odiva-orange/30 to-odiva-forest/20 rounded-3xl blur-2xl opacity-70" />

                {/* Hero Showcase Card */}
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh Odisha Groceries and Vegetables"
                    className="w-full h-80 sm:h-96 object-cover"
                  />

                  {/* Overlaid Floating Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-odiva-border shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-odiva-cream flex items-center justify-center text-odiva-forest text-xl font-black">
                        ଓ
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-odiva-dark">
                          {language === "or" ? "ଖାଣ୍ଟି ଓଡ଼ିଶା ଦ୍ରବ୍ୟ" : "100% Authentic Odisha Sourced"}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          {language === "or" ? "ବରଗଡ଼ ଚାଉଳ, ନୟାଗଡ଼ ଛେନାପୋଡ଼ ଓ କେନ୍ଦୁଝର ବଡ଼ି" : "Nayagarh, Keonjhar, Mayurbhanj, Puri"}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/odisha-specials"
                      className="p-2 rounded-xl bg-odiva-forest text-white hover:bg-emerald-800 transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SHOP BY CATEGORY (Multicoloured Design System) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              {t.sections.categories}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {t.sections.categoriesSub}
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-odiva-forest hover:text-odiva-orange transition flex items-center gap-1 flex-shrink-0"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className={`group p-3.5 rounded-2xl bg-gradient-to-b ${cat.cardBg} border border-odiva-border hover:shadow-card transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1`}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs mb-2.5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: cat.accentColor, color: "#FFFFFF" }}
              >
                <span className="text-xl font-bold">
                  {cat.id === "rice-grains" && "🌾"}
                  {cat.id === "pulses-lentils" && "🫘"}
                  {cat.id === "fresh-vegetables" && "🥦"}
                  {cat.id === "fruits" && "🍎"}
                  {cat.id === "spices-cooking" && "🌶️"}
                  {cat.id === "dairy-essentials" && "🥛"}
                  {cat.id === "odia-sweets-snacks" && "🍯"}
                  {cat.id === "household-essentials" && "🪔"}
                </span>
              </div>
              <h3 className={`font-bold text-xs leading-snug ${cat.textColor} line-clamp-1`}>
                {language === "or" ? cat.odiaName : cat.name}
              </h3>
              <span className="text-[10px] text-gray-500 font-medium mt-0.5">
                {cat.itemCount}+ items
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. ODISHA SPECIAL PRODUCTS (Heritage & GI Tagged) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-to-r from-red-50/70 via-amber-50/50 to-orange-50/70 py-10 border-y border-odiva-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-odiva-red text-white text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                <Award className="w-3 h-3" />
                <span>GI Tagged & Cultural Pride</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
                {t.sections.odishaSpecials}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                {t.sections.odishaSpecialsSub}
              </p>
            </div>
            <Link
              href="/odisha-specials"
              className="text-xs sm:text-sm font-bold text-odiva-red hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <span>Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {odishaSpecials.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. FRESH HARVEST & DAILY ARRIVALS */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <span>🌱 5:30 AM Farm Harvested</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              {t.sections.freshArrivals}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {t.sections.freshArrivalsSub}
            </p>
          </div>
          <Link
            href="/shop?category=fresh-vegetables"
            className="text-xs sm:text-sm font-bold text-odiva-forest hover:text-odiva-orange transition flex items-center gap-1 flex-shrink-0"
          >
            <span>See Farm Produce</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {freshArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. INTERACTIVE FEATURE: "AJI KANA RANDA HABA?" (What Shall We Cook Today?) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-to-b from-odiva-cream via-amber-50 to-white py-12 border-y border-odiva-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-odiva-orange text-white text-xs font-bold shadow-xs">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Ama Odisha Kitchen</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-odiva-dark mt-2 tracking-tight">
              {language === "or"
                ? "ଆଜି କଣ ରନ୍ଧା ହେବ? (Aji Kana Randa Haba?)"
                : "Aji Kana Randa Haba? (What Shall We Cook Today?)"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
              {t.sections.recipesSub}
            </p>
          </div>

          {/* Recipe Switcher Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none justify-start md:justify-center mb-6">
            {RECIPES.slice(0, 6).map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                  selectedRecipe.id === recipe.id
                    ? "bg-odiva-forest text-white shadow-md scale-102"
                    : "bg-white hover:bg-odiva-peach/50 text-gray-700 border border-odiva-border"
                }`}
              >
                {language === "or" ? recipe.odiaName : recipe.name}
              </button>
            ))}
          </div>

          {/* Interactive Recipe Viewer Card */}
          <div className="bg-white rounded-3xl border border-odiva-border shadow-card p-6 md:p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Recipe Photo */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={selectedRecipe.imageUrl}
                    alt={selectedRecipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 font-semibold">
                  <span>⏱️ Prep: {selectedRecipe.prepTimeMinutes} mins</span>
                  <span>🔥 Cook: {selectedRecipe.cookTimeMinutes} mins</span>
                  <span className="bg-odiva-cream px-2 py-0.5 rounded text-odiva-forest font-bold">
                    {selectedRecipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Recipe Details & 1-Click Grocery Link */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-odiva-dark">
                    {selectedRecipe.name}
                  </h3>
                  <p className="text-sm font-bold text-odiva-orange">
                    {selectedRecipe.odiaName}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {language === "or" ? selectedRecipe.odiaDescription : selectedRecipe.description}
                  </p>
                </div>

                {/* Servings Adjuster */}
                <div className="flex items-center gap-4 p-3 bg-odiva-cream/50 rounded-2xl border border-odiva-border">
                  <span className="text-xs font-bold text-gray-700">
                    {language === "or" ? "ଜଣଙ୍କ ପାଇଁ ପରିମାଣ:" : "Adjust Family Servings:"}
                  </span>
                  <div className="flex items-center bg-white rounded-xl border border-odiva-border p-0.5">
                    {[2, 4, 6, 8].map((s) => (
                      <button
                        key={s}
                        onClick={() => setServingsMultiplier(s)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                          servingsMultiplier === s
                            ? "bg-odiva-forest text-white"
                            : "text-gray-600 hover:text-odiva-forest"
                        }`}
                      >
                        {s} {language === "or" ? "ଜଣ" : "People"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Linked Ingredients Preview */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {t.recipes.ingredientsNeeded} ({selectedRecipe.ingredients.length} items):
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {selectedRecipe.ingredients.slice(0, 6).map((ing, idx) => {
                      const scaledAmount = Math.round(
                        (ing.amount / selectedRecipe.servings) * servingsMultiplier
                      );
                      return (
                        <div
                          key={idx}
                          className="p-2 bg-gray-50 rounded-xl border border-gray-100 text-xs"
                        >
                          <span className="font-bold text-gray-800 block truncate">
                            {language === "or" ? ing.odiaName : ing.name}
                          </span>
                          <span className="text-[11px] text-odiva-forest font-semibold">
                            {scaledAmount} {ing.unit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 1-Click Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleAddRecipeToCart(selectedRecipe)}
                    className="px-6 py-3 bg-gradient-to-r from-odiva-forest to-emerald-800 hover:from-emerald-800 hover:to-odiva-forest text-white rounded-2xl font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2"
                  >
                    <span>🛒 {t.recipes.addMissingToCart}</span>
                  </button>

                  <Link
                    href={`/recipes/${selectedRecipe.slug}`}
                    className="px-5 py-3 bg-white hover:bg-odiva-cream text-odiva-forest border border-odiva-forest/30 rounded-2xl font-bold text-xs transition"
                  >
                    {t.recipes.viewRecipe} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. BEST SELLERS */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              {t.sections.bestSellers}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {t.sections.bestSellersSub}
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs sm:text-sm font-bold text-odiva-forest hover:text-odiva-orange transition flex items-center gap-1 flex-shrink-0"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. SAVE BEFORE WASTE (Discounted Near-Expiry Clearance) */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-2">
                <span>⏳ Zero Food Waste Mission</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                {t.sections.wasteTitle}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium mt-1 max-w-xl">
                {t.sections.wasteSub}
              </p>
            </div>
            <Link
              href="/save-before-waste"
              className="px-5 py-2.5 bg-white text-odiva-dark hover:bg-odiva-cream rounded-full text-xs font-bold shadow transition self-start md:self-auto"
            >
              View All Clearance Offers →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WASTE_OFFERS.slice(0, 3).map((offer) => {
              const prod = PRODUCTS.find((p) => p.id === offer.productId);
              if (!prod) return null;
              return (
                <div
                  key={offer.id}
                  className="bg-white rounded-3xl p-4 text-odiva-dark shadow-xl flex gap-4 items-center border border-white/20"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-24 h-24 rounded-2xl object-cover bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {offer.discountPercent}% OFF
                      </span>
                      <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                        {offer.daysRemaining} days left
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-gray-900 truncate">
                      {language === "or" ? prod.odiaName : prod.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-medium">{prod.packSize}</p>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-black text-odiva-forest">
                        {formatPrice(offer.discountedPrice)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(offer.originalPrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="mt-2 w-full py-1.5 bg-odiva-forest hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      {t.product.addToCart}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. AMA FARMERS & LOCAL PRODUCERS */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Direct Sourcing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              {t.sections.farmersTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {t.sections.farmersSub}
            </p>
          </div>
          <Link
            href="/ama-farmers"
            className="text-xs sm:text-sm font-bold text-odiva-forest hover:text-odiva-orange transition flex items-center gap-1 flex-shrink-0"
          >
            <span>Meet All Producers</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCERS.slice(0, 3).map((producer) => (
            <div
              key={producer.id}
              className="bg-white rounded-3xl border border-odiva-border overflow-hidden shadow-sm hover:shadow-card transition flex flex-col justify-between"
            >
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img
                  src={producer.photoUrl}
                  alt={producer.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-odiva-forest shadow">
                  📍 {producer.village}, {producer.district}
                </span>
                <span className="absolute bottom-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                  Verified Since {producer.verifiedSince}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-odiva-dark">{producer.name}</h3>
                  <p className="text-xs font-semibold text-odiva-orange mt-0.5">
                    {producer.specialty}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {producer.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 font-medium">
                    {producer.cooperativeName}
                  </span>
                  <Link
                    href={`/ama-farmers?producer=${producer.id}`}
                    className="text-xs font-bold text-odiva-forest hover:underline"
                  >
                    View Products →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. ODISHA FESTIVAL COLLECTIONS */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              {t.sections.festivalsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              {t.sections.festivalsSub}
            </p>
          </div>
          <Link
            href="/festivals"
            className="text-xs sm:text-sm font-bold text-odiva-forest hover:text-odiva-orange transition flex items-center gap-1 flex-shrink-0"
          >
            <span>All Festivals</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FESTIVALS.slice(0, 3).map((fest) => (
            <Link
              key={fest.id}
              href={`/festivals/${fest.slug}`}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-64 flex flex-col justify-end p-6 border border-odiva-border"
            >
              <img
                src={fest.imageUrl}
                alt={fest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-odiva-turmeric text-odiva-dark inline-block mb-1">
                  {fest.eventDates}
                </span>
                <h3 className="font-black text-lg text-white group-hover:text-odiva-turmeric transition-colors">
                  {language === "or" ? fest.odiaName : fest.name}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2">{fest.tagline}</p>
                <span className="text-xs font-bold text-odiva-turmeric pt-2 inline-flex items-center gap-1">
                  Explore Festival Kit →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. CUSTOMER REVIEWS */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-odiva-cream/60 py-12 border-t border-odiva-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-odiva-dark tracking-tight">
              {t.sections.reviewsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Real stories from our patrons across Bhubaneswar, Cuttack, Puri & Berhampur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-odiva-dark">{rev.name}</h4>
                    <p className="text-[11px] text-gray-400">{rev.city}</p>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
