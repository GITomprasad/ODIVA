"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  Sparkles,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Users,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function BudgetHataPage() {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const [budgetTier, setBudgetTier] = useState<number>(400);
  const [customBudget, setCustomBudget] = useState<string>("450");
  const [familySize, setFamilySize] = useState<number>(3);
  const [durationDays, setDurationDays] = useState<number>(4);
  const [dietary, setDietary] = useState<"all" | "veg">("all");

  // Selected basket items
  const [basketItems, setBasketItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [addedAll, setAddedAll] = useState(false);

  // Active budget number
  const effectiveBudget = budgetTier === 0 ? Number(customBudget) || 300 : budgetTier;

  // Deterministic basket generator
  const generateBasket = () => {
    let budgetRemaining = effectiveBudget;
    const generated: { product: Product; quantity: number }[] = [];

    // Core staple priorities:
    // 1. Usuna Rice (₹52) or Arua Rice (₹68)
    const rice = PRODUCTS.find((p) => p.id === "odiva-usuna-rice") || PRODUCTS[0];
    if (rice && budgetRemaining >= rice.price) {
      generated.push({ product: rice, quantity: 1 });
      budgetRemaining -= rice.price;
    }

    // 2. Desi Moong Dal (₹128) or Masoor (₹92)
    const dal = PRODUCTS.find((p) => (effectiveBudget < 350 ? p.id === "odiva-masoor-dal" : p.id === "odiva-moong-dal-desi")) || PRODUCTS[16];
    if (dal && budgetRemaining >= dal.price) {
      generated.push({ product: dal, quantity: 1 });
      budgetRemaining -= dal.price;
    }

    // 3. Potatoes (₹32)
    const potato = PRODUCTS.find((p) => p.id === "odiva-potato-fresh");
    if (potato && budgetRemaining >= potato.price) {
      generated.push({ product: potato, quantity: 1 });
      budgetRemaining -= potato.price;
    }

    // 4. Onions (₹38)
    const onion = PRODUCTS.find((p) => p.id === "odiva-onion-nasik");
    if (onion && budgetRemaining >= onion.price) {
      generated.push({ product: onion, quantity: 1 });
      budgetRemaining -= onion.price;
    }

    // 5. Fresh Green Vegetables (e.g. Pumpkin ₹30, Spinach ₹22, Drumsticks ₹45, Brinjal ₹36)
    const candidateVegs = [
      "odiva-pumpkin-kakharu",
      "odiva-spinach-palanga",
      "odiva-tomato-desi",
      "odiva-drumstick-sajana",
    ];

    for (const vId of candidateVegs) {
      const veg = PRODUCTS.find((p) => p.id === vId);
      if (veg && budgetRemaining >= veg.price) {
        generated.push({ product: veg, quantity: 1 });
        budgetRemaining -= veg.price;
      }
    }

    // 6. Odia Special Treat or Badi if balance remains
    if (budgetRemaining >= 55) {
      const mudhiOrBadi = PRODUCTS.find((p) => (budgetRemaining >= 85 ? p.id === "odiva-keonjhar-phula-badi" : p.id === "odiva-mudhi-baripada"));
      if (mudhiOrBadi && budgetRemaining >= mudhiOrBadi.price) {
        generated.push({ product: mudhiOrBadi, quantity: 1 });
        budgetRemaining -= mudhiOrBadi.price;
      }
    }

    setBasketItems(generated);
  };

  // Run initial generator once on load
  React.useEffect(() => {
    generateBasket();
  }, [budgetTier, customBudget]);

  const basketSubtotal = basketItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const unspentBalance = effectiveBudget - basketSubtotal;

  const handleUpdateItemQty = (prodId: string, delta: number) => {
    setBasketItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === prodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  const handleRemoveItem = (prodId: string) => {
    setBasketItems((prev) => prev.filter((item) => item.product.id !== prodId));
  };

  const handleAddEntireBasketToCart = () => {
    basketItems.forEach(({ product, quantity }) => {
      addToCart(product, quantity);
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-odiva-forest text-white py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Tag className="w-4 h-4 text-odiva-turmeric" />
            <span>Smart Odia Budget Planner</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {language === "or" ? "ବଜେଟ୍ ହାଟ (Budget Hata)" : "Budget Hata: Smart Odia Grocery Basket"}
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl font-medium">
            {t.budget.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-5">
          <h2 className="font-black text-base text-odiva-dark uppercase tracking-wider">
            Configure Your Basket
          </h2>

          {/* Budget tier selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Select Maximum Budget
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[300, 400, 500, 0].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setBudgetTier(tier)}
                  className={`py-2 px-1 text-center rounded-2xl text-xs font-black transition border ${
                    budgetTier === tier
                      ? "bg-odiva-forest text-white border-odiva-forest shadow-xs"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  {tier === 0 ? "Custom" : `₹${tier}`}
                </button>
              ))}
            </div>

            {budgetTier === 0 && (
              <div className="mt-2.5">
                <input
                  type="number"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  placeholder="Enter budget (e.g. 650)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-odiva-forest"
                />
              </div>
            )}
          </div>

          {/* Family Size */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Family Size (Persons)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 4, 6].map((size) => (
                <button
                  key={size}
                  onClick={() => setFamilySize(size)}
                  className={`py-2 rounded-2xl text-xs font-bold border transition ${
                    familySize === size
                      ? "bg-odiva-orange text-white border-odiva-orange shadow-xs"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  {size} {size === 1 ? "Person" : "People"}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Target Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 7].map((days) => (
                <button
                  key={days}
                  onClick={() => setDurationDays(days)}
                  className={`py-2 rounded-2xl text-xs font-bold border transition ${
                    durationDays === days
                      ? "bg-odiva-forest text-white border-odiva-forest shadow-xs"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateBasket}
            className="w-full py-3 bg-gradient-to-r from-odiva-forest to-emerald-800 text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-98"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Regenerate Smart Basket</span>
          </button>
        </div>

        {/* Generated Basket Showcase */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-odiva-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-black text-odiva-dark">
                Suggested Balanced Odia Grocery Basket
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Pantry staples, fresh vegetables & native legumes strictly within ₹{effectiveBudget}
              </p>
            </div>

            {/* Budget Gauge */}
            <div className="flex items-center gap-4 bg-odiva-cream p-2.5 rounded-2xl border border-odiva-border">
              <div className="text-right">
                <span className="text-[10px] text-gray-500 block uppercase font-bold">
                  Remaining
                </span>
                <span
                  className={`text-sm font-black ${
                    unspentBalance >= 0 ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {unspentBalance >= 0 ? `+${formatPrice(unspentBalance)}` : `Over by ${formatPrice(Math.abs(unspentBalance))}`}
                </span>
              </div>
              <div className="h-8 w-px bg-odiva-border" />
              <div>
                <span className="text-[10px] text-gray-500 block uppercase font-bold">Total</span>
                <span className="text-sm font-black text-odiva-forest">
                  {formatPrice(basketSubtotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Basket Items List */}
          <div className="space-y-3">
            {basketItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover border bg-white flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-odiva-dark truncate">
                      {language === "or" ? product.odiaName : product.name}
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      {product.packSize} • {formatPrice(product.price)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white border border-gray-200 rounded-full p-0.5">
                    <button
                      onClick={() => handleUpdateItemQty(product.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-odiva-forest rounded-full"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-odiva-dark">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateItemQty(product.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-odiva-forest rounded-full"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="w-16 text-right font-black text-xs text-odiva-forest">
                    {formatPrice(product.price * quantity)}
                  </span>

                  <button
                    onClick={() => handleRemoveItem(product.id)}
                    className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              <span>{basketItems.length} essential items selected</span>
            </div>

            <button
              onClick={handleAddEntireBasketToCart}
              disabled={basketItems.length === 0 || unspentBalance < 0}
              className="px-8 py-3.5 bg-odiva-forest hover:bg-emerald-800 disabled:opacity-50 text-white rounded-2xl font-bold text-sm shadow-md transition active:scale-98 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>
                {addedAll ? "Whole Basket Added to Cart!" : `Add All to Cart (${formatPrice(basketSubtotal)})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
