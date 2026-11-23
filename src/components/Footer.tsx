"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Truck,
  Leaf,
  Clock,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-odiva-dark text-white border-t border-odiva-forest">
      {/* Value Pillars Banner */}
      <div className="bg-gradient-to-r from-odiva-forest via-emerald-900 to-odiva-dark py-8 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-odiva-turmeric flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {language === "or" ? "୩୦-୬୦ ମିନିଟ୍ ରେ ଡେଲିଭରୀ" : "30-60 Min Express Delivery"}
              </h4>
              <p className="text-xs text-white/70">
                {language === "or" ? "ସତେଜ ପରିବା ଓ ରାସନ" : "Fast delivery in BBSR & Cuttack"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-odiva-turmeric flex-shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {language === "or" ? "୩୦ ଟି ଜିଲ୍ଲାରୁ ସିଧାସଳଖ" : "Direct From 30 Districts"}
              </h4>
              <p className="text-xs text-white/70">
                {language === "or" ? "ପ୍ରକୃତ କୃଷକ ଓ କାରିଗର" : "Authentic native Odisha rices & spices"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-odiva-turmeric flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {language === "or" ? "୧୦୦% ଖାଣ୍ଟି ସୁନିଶ୍ଚିତ" : "100% Purity Guarantee"}
              </h4>
              <p className="text-xs text-white/70">
                {language === "or" ? "ଶୁଦ୍ଧ ଗୁଆ ଘିଅ, ବଡ଼ି ଓ ମିଠା" : "GI tagged authentic Odia sweets"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-odiva-turmeric flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {language === "or" ? "ସବୁଦିନିଆ ସହଯୋଗ" : "7 Days Dedicated Support"}
              </h4>
              <p className="text-xs text-white/70">
                {language === "or" ? "ସକାଳ ୭ ରୁ ରାତି ୧୦" : "Odia & English customer helpline"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-odiva-orange to-odiva-turmeric flex items-center justify-center text-odiva-dark font-black text-xl shadow">
                ଓ
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">ODIVA</span>
                <span className="text-base font-bold text-odiva-turmeric ml-1">ଓଡ଼ିଭା</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              {language === "or"
                ? "ଓଡ଼ିଶାର ପାରମ୍ପରିକ ସ୍ୱାଦ, ଖାଣ୍ଟି ଗ୍ରାମୀଣ ଉତ୍ପାଦ ଓ ଦୈନନ୍ଦିନ ତାଜା ପନିପରିବାକୁ ଆପଣଙ୍କ ଦୁଆର ମୁହଁରେ ପହଞ୍ଚାଇବା ପାଇଁ ଓଡ଼ିଭା ସର୍ବଦା ପ୍ରତିଶ୍ରୁତିବଦ୍ଧ।"
                : "ODIVA is Odisha's proud quick-commerce platform delivering everyday groceries, authentic GI heritage sweets, farm-harvested produce, and village specialities directly to your kitchen."}
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-odiva-orange" />
                <span>Central Hub: Saheed Nagar, Bhubaneswar, Odisha 751007</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-odiva-orange" />
                <span>Helpline: +91 674 254 9900 / +91 94371 00000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-odiva-orange" />
                <span>Support: care@odiva.in</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-odiva-turmeric mb-4">
              {language === "or" ? "ସାମଗ୍ରୀ ବର୍ଗ" : "Pantry & Groceries"}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/shop?category=rice-grains" className="hover:text-white transition">
                  {language === "or" ? "ଅରୁଆ ଓ ଉଷୁନା ଚାଉଳ" : "Arua & Usuna Rice"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pulses-lentils" className="hover:text-white transition">
                  {language === "or" ? "ମୁଗ, ବିରି ଓ ହରଡ଼ ଡାଲି" : "Moong, Biri & Dalma Dal"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=fresh-vegetables" className="hover:text-white transition">
                  {language === "or" ? "ତାଜା ପନିପରିବା ଓ ଶାଗ" : "Fresh Vegetables & Saga"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=spices-cooking" className="hover:text-white transition">
                  {language === "or" ? "ସୋରିଷ ତେଲ ଓ ପଞ୍ଚ ଫୁଟଣ" : "Mustard Oil & Panch Phutana"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=odia-sweets-snacks" className="hover:text-white transition">
                  {language === "or" ? "ଛେନାପୋଡ଼ ଓ ପାହାଳ ରସଗୋଲା" : "Chhena Poda & Sweets"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=dairy-essentials" className="hover:text-white transition">
                  {language === "or" ? "ଦେଶୀ ଗୁଆ ଘିଅ ଓ ଦହି" : "Desi Ghee & Fresh Curd"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Odisha Specials */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-odiva-turmeric mb-4">
              {language === "or" ? "ସ୍ୱତନ୍ତ୍ର ସମ୍ଭାର" : "Odisha Special"}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/odisha-specials" className="hover:text-white transition">
                  {language === "or" ? "ଓଡ଼ିଶାର ପ୍ରସିଦ୍ଧ ଦ୍ରବ୍ୟ" : "GI Tagged Native Heritage"}
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-white transition">
                  {language === "or" ? "ଆଜି କଣ ରନ୍ଧା ହେବ?" : "Aji Kana Randa Haba?"}
                </Link>
              </li>
              <li>
                <Link href="/budget-hata" className="hover:text-white transition">
                  {language === "or" ? "ବଜେଟ୍ ହାଟ (ସ୍ମାର୍ଟ ବ୍ୟାଗ୍)" : "Budget Hata Basket"}
                </Link>
              </li>
              <li>
                <Link href="/save-before-waste" className="hover:text-white transition">
                  {language === "or" ? "ନଷ୍ଟ ହେବାରୁ ବଞ୍ଚାନ୍ତୁ (୬୦% ଛାଡ଼)" : "Save Before Waste (60% Off)"}
                </Link>
              </li>
              <li>
                <Link href="/ama-farmers" className="hover:text-white transition">
                  {language === "or" ? "ଆମ କୃଷକ ଓ ସମବାୟ" : "Verified Odisha Farmers"}
                </Link>
              </li>
              <li>
                <Link href="/festivals" className="hover:text-white transition">
                  {language === "or" ? "ପର୍ବପର୍ବାଣୀ ସମ୍ଭାର" : "Raja, Rath & Nuakhai Kits"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-odiva-turmeric mb-4">
              {language === "or" ? "ଯୋଡ଼ି ହୁଅନ୍ତୁ" : "Get ₹100 Off"}
            </h4>
            <p className="text-xs text-gray-300 mb-3">
              {language === "or"
                ? "ସାପ୍ତାହିକ ତାଜା ପନିପରିବା ଅଫର ଓ ପର୍ବ ରିହାତି ବିଷୟରେ ଜାଣିବାକୁ ଇମେଲ୍ ଦିଅନ୍ତୁ।"
                : "Subscribe for fresh morning harvest alerts, seasonal recipes, and festival discounts."}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2 bg-emerald-950 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{language === "or" ? "ଧନ୍ୟବାଦ! ଆପଣ ଯୋଡ଼ି ହୋଇଗଲେ।" : "Thank you! Check your inbox for ₹100 coupon."}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-odiva-orange"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-odiva-orange to-amber-600 hover:from-amber-600 hover:to-odiva-orange text-white font-bold text-xs rounded-xl shadow transition"
                >
                  {language === "or" ? "ସଦସ୍ୟତା ନିଅନ୍ତୁ" : "Claim ₹100 Discount"}
                </button>
              </form>
            )}

            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-gray-400">
              <p className="font-semibold text-white/80">Active Service Cities:</p>
              <p>Bhubaneswar • Cuttack • Puri • Berhampur • Sambalpur • Rourkela • Balasore</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 ODIVA (ଓଡ଼ିଭା) Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
            <Link href="/delivery" className="hover:text-white transition">
              Delivery Info
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact Us
            </Link>
            <Link href="/admin" className="hover:text-odiva-turmeric transition font-semibold">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
