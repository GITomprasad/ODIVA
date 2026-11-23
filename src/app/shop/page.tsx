"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Filter,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronDown,
  ArrowUpDown,
  Tag,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { Product, ProductCategory } from "@/types";
import { formatPrice } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();

  const urlCategory = searchParams.get("category") || "all";
  const urlSearch = searchParams.get("q") || "";
  const urlSpecial = searchParams.get("special") === "true";

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [onlyOdishaSpecial, setOnlyOdishaSpecial] = useState<boolean>(urlSpecial);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(true);
  const [priceRange, setPriceRange] = useState<number>(500);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlSearch) setSearchQuery(urlSearch);
    if (urlSpecial) setOnlyOdishaSpecial(true);
  }, [urlCategory, urlSearch, urlSpecial]);

  // Transliteration & multi-filter search logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Odisha Special filter
      if (onlyOdishaSpecial && !product.isOdishaSpecial) {
        return false;
      }

      // Stock filter
      if (onlyInStock && (!product.isAvailable || product.stock <= 0)) {
        return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Search query (English, Odia Unicode, Transliterations, Keywords)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesOdia = product.odiaName.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesKeywords = product.searchKeywords?.some((kw) => kw.toLowerCase().includes(q));
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(q));
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDistrict = product.districtOrigin?.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesOdia &&
          !matchesDesc &&
          !matchesKeywords &&
          !matchesTags &&
          !matchesCategory &&
          !matchesDistrict
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === "price-low") return a.price - b.price;
      if (selectedSort === "price-high") return b.price - a.price;
      if (selectedSort === "rating") return b.rating - a.rating;
      if (selectedSort === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
      // Featured / Best selling
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedSort, onlyOdishaSpecial, onlyInStock, priceRange]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setOnlyOdishaSpecial(false);
    setOnlyInStock(false);
    setPriceRange(500);
    setSelectedSort("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title & Breadcrumb */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-odiva-dark tracking-tight">
            {language === "or" ? "ଓଡ଼ିଭା ସଉଦା ବଜାର" : "ODIVA Grocery Bazaar"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            {language === "or"
              ? "୧୦୦+ ଖାଣ୍ଟି ଓଡ଼ିଶା ଚାଉଳ, ଡାଲି, ତାଜା ପନିପରିବା, ମସଲା ଓ ମିଠାର ସମ୍ଭାର"
              : "Showing authentic staples, fresh greens, farm millets, and GI sweets from 30 districts"}
          </p>
        </div>

        {/* Filter / Sort bar on desktop */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden px-4 py-2 bg-odiva-cream text-odiva-forest rounded-full border border-odiva-border text-xs font-bold flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-2xs text-xs font-semibold">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400 hidden sm:inline">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent font-bold text-odiva-dark outline-none cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated (5★)</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* ========================================================= */}
        {/* SIDEBAR FILTERS (Desktop) */}
        {/* ========================================================= */}
        <aside
          className={`lg:block ${
            isMobileFilterOpen
              ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto animate-in slide-in-from-left duration-200"
              : "hidden"
          } lg:relative lg:p-0 lg:bg-transparent lg:overflow-visible space-y-6`}
        >
          {isMobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 lg:hidden">
              <h3 className="font-black text-lg">Filter Products</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Search box inside filter */}
          <div className="bg-white rounded-3xl p-5 border border-odiva-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-odiva-dark uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-odiva-forest" />
                <span>Filters</span>
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-odiva-orange hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Keyword Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search aloo, chuda, mudhi..."
                className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-odiva-forest"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Toggle Checks */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOdishaSpecial}
                  onChange={(e) => setOnlyOdishaSpecial(e.target.checked)}
                  className="rounded text-odiva-forest focus:ring-odiva-forest accent-odiva-forest w-4 h-4"
                />
                <span className="flex items-center gap-1 text-odiva-red font-bold">
                  <span>✨ Odisha Specials Only</span>
                </span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-odiva-forest focus:ring-odiva-forest accent-odiva-forest w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Price Slider */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
                <span>Max Price:</span>
                <span className="text-odiva-forest font-black">{formatPrice(priceRange)}</span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-odiva-forest cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹20</span>
                <span>₹500</span>
              </div>
            </div>

            {/* Category Radios / Buttons */}
            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Categories
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-odiva-forest text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-80">{PRODUCTS.length}</span>
                </button>

                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? "bg-odiva-forest text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="truncate">
                        {language === "or" ? cat.odiaName : cat.name}
                      </span>
                      <span className="text-[10px] opacity-80">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* PRODUCT GRID */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-400">
              {filteredProducts.length} items found
            </span>

            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-odiva-cream text-odiva-forest text-xs font-bold rounded-full border border-odiva-border">
                <span>Category: {selectedCategory.replace("-", " ")}</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setSelectedCategory("all")}
                />
              </span>
            )}

            {onlyOdishaSpecial && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-odiva-red text-xs font-bold rounded-full border border-rose-200">
                <span>Odisha Specials</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setOnlyOdishaSpecial(false)}
                />
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 text-sky-900 text-xs font-bold rounded-full border border-sky-200">
                <span>Search: &quot;{searchQuery}&quot;</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-500"
                  onClick={() => setSearchQuery("")}
                />
              </span>
            )}
          </div>

          {/* Grid of Product Cards */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-odiva-border p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-odiva-cream flex items-center justify-center text-odiva-orange mx-auto text-2xl">
                🔍
              </div>
              <h3 className="font-black text-lg text-gray-800">
                No products match your search or filter
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for
                &apos;aloo&apos;, &apos;chuda&apos;, &apos;dalma&apos;, or &apos;chhena poda&apos;!
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-odiva-forest text-white rounded-full font-bold text-xs shadow hover:bg-emerald-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-gray-500">Loading ODIVA Grocery Bazaar...</div>}>
      <ShopContent />
    </Suspense>
  );
}
