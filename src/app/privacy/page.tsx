"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-xs text-gray-700 leading-relaxed">
      <h1 className="text-3xl font-black text-odiva-dark tracking-tight">Privacy Policy</h1>
      <p className="text-gray-500">Effective Date: November 2026</p>

      <div className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-odiva-dark">1. Information We Collect</h2>
        <p>
          ODIVA collects basic information necessary to fulfill your grocery delivery in Odisha,
          including your name, phone number, delivery address, pincode, and order history.
        </p>

        <h2 className="text-sm font-bold text-odiva-dark">2. Payment Security</h2>
        <p>
          We do not store credit card or debit card details on our servers. All digital transactions
          are processed through certified PCI-DSS compliant payment gateways like Razorpay.
        </p>

        <h2 className="text-sm font-bold text-odiva-dark">3. Data Sharing</h2>
        <p>
          We never sell your personal data. Your contact details and address are shared only with our
          assigned delivery personnel for executing your order.
        </p>
      </div>
    </div>
  );
}
