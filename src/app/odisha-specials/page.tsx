"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Award, ShieldCheck, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { Product } from "@/types";

export default function OdishaSpecialsPage() {
  const { language, t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const specialProducts = PRODUCTS.filter((p) => p.isOdishaSpecial);

  const districts = Array.from(
    new Set(specialProducts.map((p) => p.districtOrigin).filter(Boolean))
  ) as string[];

  const filtered = selectedDistrict === "all"
    ? specialProducts
    : specialProducts.filter((p) => p.districtOrigin === selectedDistrict);

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-red-800 via-orange-800 to-amber-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Award className="w-4 h-4 text-odiva-turmeric" />
            <span>GI Tagged & Artisanal Odisha Treasures</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {language === "or" ? "ଓଡ଼ିଶାର ପ୍ରସିଦ୍ଧ ପାରମ୍ପରିକ ସମ୍ଭାର" : "Odisha Special & GI Heritage"}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
            {language === "or"
              ? "ନୟାଗଡ଼ ଛେନାପୋଡ଼, ପାହାଳ ରସଗୋଲା, କେନ୍ଦୁଝର ଫୁଲ ବଡ଼ି, କୋରାପୁଟ ମାଣ୍ଡିଆ ଓ ବରଗଡ଼ ଅରୁଆ ଚାଉଳ — ସିଧା ମୂଳ ସ୍ଥାନରୁ।"
              : "Iconic sweets, sun-dried badis, mountain millets, and heritage rices sourced exclusively from their certified traditional districts across Odisha."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* District Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedDistrict("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition flex-shrink-0 ${
              selectedDistrict === "all"
                ? "bg-odiva-forest text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-odiva-border"
            }`}
          >
            All Odisha ({specialProducts.length})
          </button>
          {districts.map((dist) => (
            <button
              key={dist}
              onClick={() => setSelectedDistrict(dist)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1 flex-shrink-0 ${
                selectedDistrict === dist
                  ? "bg-odiva-forest text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-odiva-border"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-odiva-orange" />
              <span>{dist}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
