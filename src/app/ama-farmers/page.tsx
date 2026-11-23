"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, MapPin, CheckCircle, ChevronRight, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PRODUCERS } from "@/data/farmers";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

function AmaFarmersContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const initialProducer = searchParams.get("producer") || "all";

  const [selectedProducerId, setSelectedProducerId] = useState<string>(initialProducer);

  const selectedProducer = PRODUCERS.find((p) => p.id === selectedProducerId);

  // Producer products
  const producerProducts = selectedProducer
    ? PRODUCTS.filter((p) => selectedProducer.productIds.includes(p.id))
    : PRODUCTS.filter((p) => p.isFarmerDirect || p.districtOrigin);

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-emerald-900 via-green-900 to-odiva-forest text-white py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ama Farmers • Direct from Odisha Cooperatives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {language === "or" ? "ଆମ କୃଷକ ଓ ଉତ୍ପାଦକ ସମବାୟ" : "Ama Farmers: Verified Odisha Producers"}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
            Meet the hard-working farming federations, women&apos;s self-help groups, and tribal grower unions across 30 Odisha districts who power ODIVA&apos;s fresh daily pantry.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Producer Selection Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-odiva-dark">
              Select Verified Producer Cooperative
            </h2>
            {selectedProducerId !== "all" && (
              <button
                onClick={() => setSelectedProducerId("all")}
                className="text-xs font-bold text-odiva-orange hover:underline"
              >
                Show All Farmers
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCERS.map((p) => {
              const isSelected = selectedProducerId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProducerId(p.id)}
                  className={`p-4 rounded-3xl border text-left transition flex items-center gap-4 ${
                    isSelected
                      ? "bg-odiva-cream border-odiva-forest ring-2 ring-odiva-forest shadow-md"
                      : "bg-white hover:bg-gray-50 border-odiva-border shadow-2xs"
                  }`}
                >
                  <img
                    src={p.photoUrl}
                    alt={p.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-gray-100 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1">
                      📍 {p.district}
                    </span>
                    <h3 className="font-bold text-xs text-odiva-dark truncate">{p.name}</h3>
                    <p className="text-[11px] text-gray-500 truncate">{p.specialty}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Producer Spotlight Profile */}
        {selectedProducer && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-odiva-border shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={selectedProducer.photoUrl}
                alt={selectedProducer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold">
                  Verified Producer
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  Partner since {selectedProducer.verifiedSince}
                </span>
              </div>
              <h2 className="text-2xl font-black text-odiva-dark">{selectedProducer.name}</h2>
              <p className="text-xs font-bold text-odiva-orange">{selectedProducer.specialty}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{selectedProducer.bio}</p>
              <div className="pt-2 text-xs text-gray-500 font-semibold flex items-center gap-4">
                <span>📍 Village: {selectedProducer.village}</span>
                <span>🏛️ Collective: {selectedProducer.cooperativeName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Products by Farmer */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-odiva-dark">
            {selectedProducer
              ? `Products from ${selectedProducer.name} (${producerProducts.length})`
              : `All Farmer-Direct Verified Products (${producerProducts.length})`}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {producerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AmaFarmersPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-gray-500">Loading verified Odisha farmers...</div>}>
      <AmaFarmersContent />
    </Suspense>
  );
}
