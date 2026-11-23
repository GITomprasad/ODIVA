"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  Globe,
  Menu,
  X,
  Sparkles,
  ShoppingBag,
  ChefHat,
  Tag,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/context/LocationContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { selectedCity, isLocationModalOpen, setIsLocationModalOpen } = useLocation();
  const { totalItems, subtotal, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, openAuthModal, logout } = useAuth();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search autocomplete
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.odiaName.toLowerCase().includes(q) ||
        p.searchKeywords?.some((kw) => kw.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-odiva-border shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-odiva-forest via-emerald-800 to-odiva-forest text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-odiva-orange text-white px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider">
              Express
            </span>
            <span className="hidden sm:inline font-medium">
              {language === "or"
                ? "ଭୁବନେଶ୍ୱର ଓ କଟକରେ ୩୦-୬୦ ମିନିଟ୍ ରେ ତାଜା ଡେଲିଭରୀ!"
                : "⚡ Express 30-60 min grocery delivery in Bhubaneswar & Cuttack! Free delivery above ₹299."}
            </span>
            <span className="sm:hidden font-medium">
              {language === "or" ? "୩୦-୬୦ ମିନିଟ୍ ଡେଲିଭରୀ" : "30-60 min Delivery in Odisha"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/budget-hata"
              className="hidden md:flex items-center gap-1 hover:text-odiva-turmeric transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-odiva-turmeric" />
              <span>{language === "or" ? "ବଜେଟ୍ ହାଟ (₹୩୦୦ ରୁ ଆରମ୍ଭ)" : "Budget Hata (From ₹300)"}</span>
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="bg-odiva-turmeric text-odiva-dark px-2 py-0.5 rounded font-bold hover:bg-yellow-400 transition"
              >
                Admin Portal
              </Link>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded-full font-semibold transition ${
                  language === "en" ? "bg-white text-odiva-forest" : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("or")}
                className={`px-2 py-0.5 rounded-full font-semibold transition ${
                  language === "or" ? "bg-white text-odiva-forest" : "text-white/80 hover:text-white"
                }`}
              >
                ଓଡ଼ିଆ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2 md:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-odiva-forest hover:bg-odiva-cream rounded-lg"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-odiva-forest via-emerald-700 to-odiva-orange flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter">ଓ</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight text-odiva-forest">
                  ODIVA
                </span>
                <span className="text-sm font-bold text-odiva-orange">
                  ଓଡ଼ିଭା
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-tight -mt-1 hidden sm:block">
                Your Odisha. Your Taste.
              </p>
            </div>
          </Link>

          {/* Delivery Location Selector */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-odiva-cream hover:bg-odiva-peach/50 border border-odiva-border text-left transition"
          >
            <MapPin className="w-4 h-4 text-odiva-orange flex-shrink-0" />
            <div className="text-xs">
              <span className="text-gray-500 block text-[10px] uppercase font-semibold">
                {t.nav.deliverTo}
              </span>
              <span className="font-bold text-odiva-forest flex items-center gap-1">
                {language === "or" ? selectedCity.odiaName : selectedCity.name}
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </span>
            </div>
          </button>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={t.nav.searchPlaceholder}
                className="w-full pl-10 pr-24 py-2.5 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 focus:border-odiva-forest rounded-full text-sm outline-none transition shadow-inner focus:shadow-md text-gray-900"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-odiva-forest hover:bg-emerald-800 text-white rounded-full text-xs font-semibold transition flex items-center gap-1"
              >
                Search
              </button>
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-odiva-border p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[11px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">
                  Suggestions ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-odiva-cream rounded-xl transition group"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-odiva-forest truncate">
                        {language === "or" ? product.odiaName : product.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {product.packSize} • {product.category.replace("-", " ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm text-odiva-forest">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2 text-center">
                  <Link
                    href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="text-xs font-bold text-odiva-orange hover:underline block py-1"
                  >
                    View all results for &quot;{searchQuery}&quot; →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 text-gray-700 hover:text-odiva-red hover:bg-rose-50 rounded-full transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-odiva-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            {user ? (
              <div className="relative group">
                <Link
                  href="/account"
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-odiva-cream hover:bg-odiva-peach text-xs font-semibold text-odiva-forest transition"
                >
                  <div className="w-6 h-6 rounded-full bg-odiva-forest text-white flex items-center justify-center text-[10px] font-bold">
                    {user.fullName.charAt(0)}
                  </div>
                  <span className="hidden md:inline font-bold">
                    {user.fullName.split(" ")[0]}
                  </span>
                </Link>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-odiva-forest hover:bg-odiva-cream rounded-full transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{t.nav.signIn}</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-odiva-forest hover:bg-emerald-800 text-white px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-md transition hover:scale-102 flex-shrink-0"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-odiva-orange text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {totalItems === 0 ? t.nav.cart : formatPrice(subtotal)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Category & Experience Nav Bar (Desktop) */}
      <nav className="hidden lg:block bg-odiva-sand border-t border-odiva-border text-xs font-semibold text-odiva-dark">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-odiva-forest transition"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/shop"
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-odiva-forest transition"
            >
              {t.nav.shop}
            </Link>
            <Link
              href="/odisha-specials"
              className="px-3 py-1.5 rounded-lg hover:bg-white text-odiva-red font-bold transition flex items-center gap-1"
            >
              <span>🔥</span>
              <span>{t.nav.odishaSpecials}</span>
            </Link>
            <Link
              href="/recipes"
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-odiva-forest transition flex items-center gap-1"
            >
              <ChefHat className="w-3.5 h-3.5 text-odiva-orange" />
              <span>{t.nav.recipes}</span>
            </Link>
            <Link
              href="/budget-hata"
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-odiva-forest transition flex items-center gap-1"
            >
              <Tag className="w-3.5 h-3.5 text-odiva-turmeric" />
              <span>{t.nav.budgetBasket}</span>
            </Link>
            <Link
              href="/ama-farmers"
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-odiva-forest transition flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-odiva-green" />
              <span>{t.nav.farmers}</span>
            </Link>
            <Link
              href="/save-before-waste"
              className="px-3 py-1.5 rounded-lg hover:bg-white text-amber-700 font-bold transition flex items-center gap-1"
            >
              <span>⏳</span>
              <span>{t.nav.wasteReduction}</span>
            </Link>
            <Link
              href="/festivals"
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-odiva-forest transition"
            >
              {t.nav.festivals}
            </Link>
            <Link
              href="/about"
              className="px-3 py-1.5 rounded-lg hover:bg-white hover:text-odiva-forest transition"
            >
              {t.nav.aboutUs}
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
            <span className="flex items-center gap-1 text-emerald-800 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Puri, BBSR, Cuttack Hubs Active
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-odiva-border p-4 shadow-xl space-y-3 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => {
              setIsLocationModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 bg-odiva-cream rounded-xl text-left"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-odiva-orange" />
              <div>
                <span className="text-[10px] text-gray-500 block uppercase font-bold">
                  {t.nav.deliverTo}
                </span>
                <span className="font-bold text-sm text-odiva-forest">
                  {language === "or" ? selectedCity.odiaName : selectedCity.name}
                </span>
              </div>
            </div>
            <span className="text-xs text-odiva-orange font-bold">Change</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-gray-50 rounded-xl font-bold text-sm text-odiva-forest"
            >
              🏠 {t.nav.home}
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-gray-50 rounded-xl font-bold text-sm text-odiva-forest"
            >
              🛍️ {t.nav.shop}
            </Link>
            <Link
              href="/odisha-specials"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-rose-50 text-odiva-red rounded-xl font-bold text-sm"
            >
              ✨ {t.nav.odishaSpecials}
            </Link>
            <Link
              href="/recipes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-amber-50 text-amber-900 rounded-xl font-bold text-sm"
            >
              🍲 {t.nav.recipes}
            </Link>
            <Link
              href="/budget-hata"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl font-bold text-sm"
            >
              💰 {t.nav.budgetBasket}
            </Link>
            <Link
              href="/save-before-waste"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-orange-50 text-orange-900 rounded-xl font-bold text-sm"
            >
              ⏳ {t.nav.wasteReduction}
            </Link>
            <Link
              href="/ama-farmers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-green-50 text-green-900 rounded-xl font-bold text-sm"
            >
              👨‍🌾 {t.nav.farmers}
            </Link>
            <Link
              href="/festivals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-purple-50 text-purple-900 rounded-xl font-bold text-sm"
            >
              🎉 {t.nav.festivals}
            </Link>
          </div>

          <div className="pt-2 border-t flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Language:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  language === "en" ? "bg-odiva-forest text-white" : "bg-gray-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("or")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  language === "or" ? "bg-odiva-forest text-white" : "bg-gray-100"
                }`}
              >
                ଓଡ଼ିଆ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
