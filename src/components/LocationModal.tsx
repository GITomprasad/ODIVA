"use client";

import React, { useState } from "react";
import { X, MapPin, Check, Search, AlertCircle } from "lucide-react";
import { useLocation } from "@/context/LocationContext";
import { useLanguage } from "@/context/LanguageContext";
import { CITIES_LIST, checkPincodeServiceability } from "@/data/deliveryZones";

export default function LocationModal() {
  const {
    selectedCity,
    selectCity,
    pincode,
    setPincode,
    isLocationModalOpen,
    setIsLocationModalOpen,
  } = useLocation();
  const { language } = useLanguage();

  const [inputPincode, setInputPincode] = useState(pincode);
  const [pincodeStatus, setPincodeStatus] = useState<{
    tested: boolean;
    serviceable: boolean;
    city?: string;
    text?: string;
  }>({ tested: false, serviceable: true });

  if (!isLocationModalOpen) return null;

  const handleTestPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPincode.trim()) return;
    const match = checkPincodeServiceability(inputPincode);
    if (match) {
      setPincodeStatus({
        tested: true,
        serviceable: match.isServiceable,
        city: match.city,
        text: match.estimatedDeliveryText,
      });
      if (match.isServiceable) {
        setPincode(match.pincode);
        selectCity(match.city);
      }
    } else {
      setPincodeStatus({
        tested: true,
        serviceable: false,
        text: "Delivery coming soon to this pincode. Currently serving 12 major Odisha hubs.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsLocationModalOpen(false)}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-odiva-orange" />
            <h3 className="font-extrabold text-lg text-odiva-dark">
              {language === "or" ? "ଡେଲିଭରୀ ସ୍ଥାନ ବାଛନ୍ତୁ" : "Choose Delivery Location"}
            </h3>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Code Checker */}
        <div className="my-5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
            {language === "or" ? "ପିନ୍ କୋଡ୍ ଦେଇ ଯାଞ୍ଚ କରନ୍ତୁ" : "Enter PIN Code to check availability"}
          </label>
          <form onSubmit={handleTestPincode} className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={inputPincode}
              onChange={(e) => setInputPincode(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 751001"
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-2xl text-sm font-semibold outline-none focus:border-odiva-forest"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-odiva-forest text-white rounded-2xl text-xs font-bold shadow hover:bg-emerald-800 transition"
            >
              Check
            </button>
          </form>

          {pincodeStatus.tested && (
            <div
              className={`mt-3 p-3 rounded-2xl text-xs font-semibold flex items-start gap-2 ${
                pincodeStatus.serviceable
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : "bg-amber-50 text-amber-900 border border-amber-200"
              }`}
            >
              {pincodeStatus.serviceable ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Delivery Available in {pincodeStatus.city}!</p>
                    <p className="text-[11px] text-emerald-700">{pincodeStatus.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Coming Soon!</p>
                    <p className="text-[11px] text-amber-800">{pincodeStatus.text}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Major Active Cities Grid */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            {language === "or" ? "ସକ୍ରିୟ ସହର ସମୂହ" : "Active Delivery Hubs"}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {CITIES_LIST.map((city) => {
              const isSelected = selectedCity.name === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => {
                    if (city.isActive) {
                      selectCity(city.name);
                      setIsLocationModalOpen(false);
                    }
                  }}
                  disabled={!city.isActive}
                  className={`p-3 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-odiva-cream border-odiva-forest ring-1 ring-odiva-forest"
                      : city.isActive
                      ? "bg-gray-50/60 hover:bg-white hover:border-gray-300 border-gray-100"
                      : "bg-gray-100/50 border-gray-100 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-odiva-dark">
                      {language === "or" ? city.odiaName : city.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-odiva-forest" />}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">
                    {city.isActive ? "Express Hub" : "Coming Soon"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
