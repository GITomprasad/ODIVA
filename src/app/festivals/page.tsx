"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, ChevronRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { FESTIVALS } from "@/data/festivals";

export default function FestivalsPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-red-700 via-yellow-700 to-amber-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <span>🎉 Baramasa Tera Parba</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {language === "or" ? "ଓଡ଼ିଶାର ପର୍ବପର୍ବାଣୀ ସମ୍ଭାର" : "Odisha Festival Collections"}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
            From Raja Poda Pitha and Jagannath Rath Yatra Mahaprasad to Nuakhai harvest rices and Diwali ghee diyas — shop authentic festival hampers delivered same-day.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FESTIVALS.map((fest) => (
            <div
              key={fest.id}
              className="bg-white rounded-3xl border border-odiva-border overflow-hidden shadow-sm hover:shadow-card transition flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <img
                  src={fest.imageUrl}
                  alt={fest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-odiva-turmeric text-odiva-dark font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg shadow">
                  {fest.eventDates}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-black text-xl text-odiva-dark group-hover:text-odiva-forest transition-colors">
                    {language === "or" ? fest.odiaName : fest.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {fest.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">
                    {fest.productIds.length} Puja & Feast Essentials
                  </span>
                  <Link
                    href={`/festivals/${fest.slug}`}
                    className="px-4 py-2 bg-odiva-forest hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                  >
                    <span>View Collection</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
