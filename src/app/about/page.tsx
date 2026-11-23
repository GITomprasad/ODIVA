"use client";

import React from "react";
import Link from "next/link";
import { Leaf, ShieldCheck, Heart, Sparkles, MapPin, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-odiva-forest via-emerald-900 to-odiva-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-odiva-turmeric mx-auto text-2xl font-black shadow-inner">
            ଓ
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            About ODIVA (ଓଡ଼ିଭା)
          </h1>
          <p className="text-base sm:text-lg text-odiva-turmeric font-bold">
            Your Odisha. Your Taste. Your Store.
          </p>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Founded with a passion to bring pure, unadulterated Odia culinary heritage, native farm produce, and authentic district specialties to every modern dining table.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 space-y-10 text-gray-700 text-sm leading-relaxed">
        {/* Story Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-odiva-border shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-odiva-dark">Our Odisha Story</h2>
          <p>
            Odisha has one of the world’s most ancient, diverse, and wholesome culinary cultures.
            From the sacred non-fried Mahaprasad of Puri Jagannath Temple to the cooling health of
            Dahi Pakhala, the sun-cured crunch of Keonjhar Phula Badi, and the rich caramelized
            sweetness of Nayagarh Chhena Poda — our food is deeply tied to the land, seasons, and
            festivals.
          </p>
          <p>
            Yet for busy families in Bhubaneswar, Cuttack, or living across India, finding authentic
            Odia rices (Arua, Usuna), pure stone-ground Panch Phutana, tender Potala, or organic
            Kandhamal turmeric was fragmented and difficult.
          </p>
          <p className="font-bold text-odiva-forest">
            ODIVA was born to bridge this gap: combining the speed of quick commerce with the
            cultural soul of Odisha.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-odiva-cream/50 rounded-3xl p-6 border border-odiva-border shadow-xs space-y-2">
            <span className="text-2xl">🌾</span>
            <h3 className="font-black text-base text-odiva-dark">Direct District Sourcing</h3>
            <p className="text-xs text-gray-600">
              We partner directly with farmers in Bargarh, Keonjhar, Mayurbhanj, Kandhamal, and
              Koraput, eliminating middlemen and paying fair rates.
            </p>
          </div>

          <div className="bg-odiva-cream/50 rounded-3xl p-6 border border-odiva-border shadow-xs space-y-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-black text-base text-odiva-dark">30-60 Min Delivery</h3>
            <p className="text-xs text-gray-600">
              Modern dark hubs in Bhubaneswar and Cuttack ensure your morning vegetables, fresh milk,
              and hot sweets arrive in peak condition.
            </p>
          </div>

          <div className="bg-odiva-cream/50 rounded-3xl p-6 border border-odiva-border shadow-xs space-y-2">
            <span className="text-2xl">🍲</span>
            <h3 className="font-black text-base text-odiva-dark">Culinary Innovation</h3>
            <p className="text-xs text-gray-600">
              From our 1-click recipe baskets in &quot;Aji Kana Randa Haba?&quot; to deterministic &quot;Budget
              Hata&quot; meal bags, shopping is effortless and fun.
            </p>
          </div>
        </div>

        {/* Commitment */}
        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-200 text-xs text-emerald-950 font-medium">
          🌱 <strong>Our Zero Waste Commitment:</strong> Through our Save Before Waste initiative,
          we provide deep discounts on products approaching shelf-life, ensuring zero safe food is
          wasted while providing budget relief to our communities.
        </div>
      </div>
    </div>
  );
}
