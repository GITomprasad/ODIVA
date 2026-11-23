"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-xs text-gray-700 leading-relaxed">
      <h1 className="text-3xl font-black text-odiva-dark tracking-tight">Terms and Conditions</h1>
      <p className="text-gray-500">Effective Date: November 2026</p>

      <div className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-odiva-dark">1. Platform Services</h2>
        <p>
          ODIVA (ଓଡ଼ିଭା) is an online quick-commerce grocery platform based in Odisha, India. By
          placing an order on the website, you agree to these terms.
        </p>

        <h2 className="text-sm font-bold text-odiva-dark">2. Product Freshness & Quality</h2>
        <p>
          All fresh vegetables, rices, sweets, and staples are checked against quality parameters.
          If any item fails to meet your satisfaction upon doorstep delivery, you can request an
          immediate return or replacement via our customer care desk.
        </p>

        <h2 className="text-sm font-bold text-odiva-dark">3. Delivery Serviceability</h2>
        <p>
          Delivery is subject to serviceability within our defined delivery PIN codes. Orders placed
          outside active serviceable areas will be flagged during checkout.
        </p>
      </div>
    </div>
  );
}
