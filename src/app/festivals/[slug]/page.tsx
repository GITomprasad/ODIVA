"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Sparkles, Calendar, ShoppingCart, ChevronRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { FESTIVALS } from "@/data/festivals";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/utils";

export default function FestivalDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useLanguage();
  const { addToCart } = useCart();

  const festival = FESTIVALS.find((f) => f.slug === slug || f.id === slug);
  const [addedAll, setAddedAll] = useState(false);

  if (!festival) {
    return notFound();
  }

  const festivalProducts = PRODUCTS.filter((p) => festival.productIds.includes(p.id));
  const kitTotal = festivalProducts.reduce((acc, p) => acc + p.price, 0);

  const handleAddEntireKit = () => {
    festivalProducts.forEach((p) => addToCart(p, 1));
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <section className={`bg-gradient-to-r ${festival.bannerColor} text-white py-12 px-4`}>
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <span>{festival.eventDates}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {language === "or" ? festival.odiaName : festival.name}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
            {festival.tagline}
          </p>

          <div className="pt-2">
            <button
              onClick={handleAddEntireKit}
              className="px-6 py-3 bg-white hover:bg-odiva-cream text-odiva-dark rounded-full font-bold text-xs shadow-lg transition flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 text-odiva-forest" />
              <span>
                {addedAll ? "Festival Hamper Added!" : `1-Click Buy Complete Puja Hamper (${formatPrice(kitTotal)})`}
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h2 className="text-xl font-black text-odiva-dark">
          Curated Festival Ingredients & Specialties ({festivalProducts.length})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {festivalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
