"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-odiva-dark tracking-tight">Contact ODIVA Support</h1>
        <p className="text-xs text-gray-500 font-medium mt-1">
          We are here to assist with deliveries, product sourcing inquiries, or order status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="md:col-span-5 bg-odiva-cream rounded-3xl p-6 border border-odiva-border shadow-xs space-y-4 text-xs">
          <h2 className="font-black text-sm text-odiva-forest uppercase tracking-wider">
            Odisha Head Hub
          </h2>

          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-odiva-orange flex-shrink-0 mt-0.5" />
              <span>Plot 104, Saheed Nagar, Near Maharshi College, Bhubaneswar, Odisha 751007</span>
            </p>

            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-odiva-orange flex-shrink-0" />
              <span>+91 674 254 9900 / +91 94371 00000</span>
            </p>

            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-odiva-orange flex-shrink-0" />
              <span>care@odiva.in</span>
            </p>
          </div>

          <div className="pt-3 border-t border-odiva-border text-gray-600">
            <p className="font-bold text-odiva-forest">Customer Support Hours:</p>
            <p>Monday – Sunday: 7:00 AM – 10:00 PM IST</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-odiva-border shadow-sm">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-odiva-dark">Message Received!</h3>
              <p className="text-xs text-gray-500">
                Our customer desk in Bhubaneswar will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priyadarshini Mohanty"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-odiva-forest"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-odiva-forest"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Message / Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need help with..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none focus:border-odiva-forest resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-odiva-forest hover:bg-emerald-800 text-white rounded-xl font-bold shadow transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
