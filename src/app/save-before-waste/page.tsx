"use client";

import React from "react";
import Link from "next/link";
import { Clock, AlertTriangle, ShieldCheck, ShoppingCart, Plus, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { WASTE_OFFERS } from "@/data/wasteOffers";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function SaveBeforeWastePage() {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <span>⏳ Zero Food Waste Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {language === "or" ? "ନଷ୍ଟ ହେବାରୁ ବଞ୍ଚାନ୍ତୁ (Save Before Waste)" : "Save Before Waste: Clearance Corner"}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
            100% fresh, hygienic, perfectly safe farm and bakery products approaching their best-before date at up to 60% discount. Help us fight food waste while saving on groceries!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 font-medium flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            Every item in this section is rigorously verified for temperature and freshness before dispatch. Expiry dates are strictly validated on our servers during checkout.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WASTE_OFFERS.map((offer) => {
            const product = PRODUCTS.find((p) => p.id === offer.productId);
            if (!product) return null;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl border border-odiva-border p-5 shadow-sm hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-odiva-red text-white text-xs font-black px-2.5 py-1 rounded-lg shadow">
                      {offer.discountPercent}% OFF
                    </span>
                    <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[11px] font-bold">
                      Best before: {offer.expiryDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                      🔥 Only {offer.stockAvailable} units left
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      ⏳ {offer.daysRemaining} days left
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-odiva-dark">{product.name}</h3>
                  <p className="text-xs font-bold text-odiva-orange">{product.odiaName}</p>
                  <p className="text-xs text-gray-500 mt-1">{product.packSize}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-odiva-forest">
                        {formatPrice(offer.discountedPrice)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(offer.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      addToCart({
                        ...product,
                        price: offer.discountedPrice,
                        originalPrice: offer.originalPrice,
                      })
                    }
                    className="px-4 py-2 bg-odiva-forest hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
