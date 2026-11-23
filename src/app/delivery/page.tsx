"use client";

import React from "react";
import { Truck, MapPin, Clock, ShieldCheck, Check } from "lucide-react";
import { CITIES_LIST, SERVICEABLE_PINCODES } from "@/data/deliveryZones";

export default function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-odiva-dark tracking-tight">
          Delivery Policies & Serviceable Hubs
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          Everything you need to know about ODIVA&apos;s express grocery network across Odisha
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-odiva-border shadow-xs text-xs space-y-2">
          <Truck className="w-6 h-6 text-odiva-forest" />
          <h3 className="font-black text-sm text-odiva-dark">Delivery Speeds</h3>
          <p className="text-gray-600">
            • Bhubaneswar & Cuttack: <strong>30-60 minutes</strong><br />
            • Puri & Berhampur: <strong>Same day (by 6 PM)</strong><br />
            • Western Odisha: <strong>Same or next day</strong>
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-odiva-border shadow-xs text-xs space-y-2">
          <ShieldCheck className="w-6 h-6 text-odiva-green" />
          <h3 className="font-black text-sm text-odiva-dark">Delivery Charges</h3>
          <p className="text-gray-600">
            • Orders above ₹299: <strong>FREE Delivery</strong><br />
            • Orders under ₹299: Standard ₹30 – ₹45 according to district distance.
          </p>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-odiva-border shadow-xs text-xs space-y-2">
          <Clock className="w-6 h-6 text-odiva-orange" />
          <h3 className="font-black text-sm text-odiva-dark">Delivery Windows</h3>
          <p className="text-gray-600">
            Daily from <strong>6:30 AM to 10:00 PM</strong> in all active locations.
          </p>
        </div>
      </div>

      {/* Active Serviceable Hubs List */}
      <div className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
        <h2 className="font-black text-lg text-odiva-dark flex items-center gap-2">
          <MapPin className="w-5 h-5 text-odiva-orange" />
          <span>Active Odisha Delivery Cities</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          {CITIES_LIST.map((city) => (
            <div
              key={city.name}
              className={`p-3 rounded-2xl border ${
                city.isActive
                  ? "bg-odiva-cream border-odiva-forest/40"
                  : "bg-gray-50 border-gray-100 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-odiva-dark">{city.name}</span>
                {city.isActive && <Check className="w-3.5 h-3.5 text-odiva-forest" />}
              </div>
              <p className="text-[10px] text-odiva-orange font-bold mt-0.5">{city.odiaName}</p>
              <p className="text-[10px] text-gray-500 mt-1">{city.estimatedDeliveryText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
