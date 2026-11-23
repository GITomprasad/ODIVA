"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/context/LocationContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { checkPincodeServiceability } from "@/data/deliveryZones";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { selectedCity, pincode: defaultPincode } = useLocation();
  const {
    items,
    subtotal,
    deliveryCharge,
    discount,
    total,
    appliedCoupon,
    clearCart,
  } = useCart();
  const { user } = useAuth();

  // Form state
  const [fullName, setFullName] = useState(user?.fullName || "Soumya Ranjan Dash");
  const [phone, setPhone] = useState(user?.phone || "+91 94371 88990");
  const [email, setEmail] = useState(user?.email || "soumya.dash@example.com");
  const [street, setStreet] = useState("Plot 104, Saheed Nagar");
  const [landmark, setLandmark] = useState("Near Maharshi College");
  const [city, setCity] = useState(selectedCity.name);
  const [pincode, setPincodeInput] = useState(defaultPincode);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">("cod");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Live Pincode Serviceability Check
  const serviceCheck = checkPincodeServiceability(pincode);
  const isServiceable = Boolean(serviceCheck && serviceCheck.isServiceable);

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-odiva-cream flex items-center justify-center text-odiva-orange mx-auto text-2xl">
          🛒
        </div>
        <h2 className="text-xl font-black text-odiva-dark">Your basket is currently empty</h2>
        <p className="text-xs text-gray-500">
          Add fresh groceries or Odisha specials to proceed to checkout!
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-odiva-forest text-white rounded-full text-xs font-bold shadow hover:bg-emerald-800 transition"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError("");

    if (!isServiceable) {
      setOrderError("Delivery is not yet serviceable in this pincode. Please try an active city.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: fullName,
        customerPhone: phone,
        customerEmail: email,
        shippingAddress: {
          fullName,
          phone,
          street,
          landmark,
          city,
          district: serviceCheck?.district || "Khordha",
          pincode,
          state: "Odisha",
        },
        cartItems: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
        paymentMethod,
        couponCode: appliedCoupon || undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success && data.order) {
        clearCart();
        router.push(`/orders/${data.order.orderNumber}?success=true`);
      } else {
        setOrderError(data.error || "Unable to place order. Please review your cart.");
      }
    } catch {
      setOrderError("An unexpected error occurred. Please check network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-odiva-dark tracking-tight">
          {t.checkout.title}
        </h1>
        <p className="text-xs text-gray-500 mt-1 font-medium">
          Express 30-60 min doorstep delivery across Odisha
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Details & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Address Section */}
          <div className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
            <h2 className="font-black text-base text-odiva-dark flex items-center gap-2">
              <MapPin className="w-5 h-5 text-odiva-orange" />
              <span>{t.checkout.deliveryDetails}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.checkout.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.checkout.phone} *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address (For receipt & updates)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {t.checkout.address} *
              </label>
              <input
                type="text"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Flat / House No, Street name"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.checkout.landmark}
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.checkout.city} *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.checkout.pincode} *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold outline-none focus:border-odiva-forest"
                />
              </div>
            </div>

            {/* Pincode Serviceability Indicator */}
            <div
              className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                isServiceable
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : "bg-red-50 text-red-900 border border-red-200"
              }`}
            >
              {isServiceable ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    Serviceable! {serviceCheck?.city} Express Hub • {serviceCheck?.estimatedDeliveryText}
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>
                    {pincode.length === 6
                      ? "Pincode is currently outside our 12 primary Odisha delivery zones."
                      : "Please enter a 6-digit Odisha PIN code (e.g. 751001 for Bhubaneswar)."}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
            <h2 className="font-black text-base text-odiva-dark flex items-center gap-2">
              <Lock className="w-4 h-4 text-odiva-forest" />
              <span>{t.checkout.paymentMethod}</span>
            </h2>

            <div className="space-y-3">
              {/* Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                  paymentMethod === "cod"
                    ? "bg-odiva-cream border-odiva-forest ring-1 ring-odiva-forest"
                    : "bg-gray-50 hover:bg-white border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 text-odiva-forest focus:ring-odiva-forest accent-odiva-forest"
                />
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-odiva-dark">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>{t.checkout.cod}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.2 rounded-full font-bold">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{t.checkout.codDesc}</p>
                </div>
              </label>

              {/* Online Payment (Razorpay) */}
              <label
                className={`p-4 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                  paymentMethod === "razorpay"
                    ? "bg-odiva-cream border-odiva-forest ring-1 ring-odiva-forest"
                    : "bg-gray-50 hover:bg-white border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                  className="mt-1 text-odiva-forest focus:ring-odiva-forest accent-odiva-forest"
                />
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs text-odiva-dark">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>{t.checkout.razorpay}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{t.checkout.razorpayDesc}</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
          <h2 className="font-black text-base text-odiva-dark">
            Order Items ({items.length})
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover border bg-gray-50 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-gray-900 block truncate">
                      {language === "or" ? product.odiaName : product.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {quantity} × {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
                <span className="font-black text-odiva-forest">
                  {formatPrice(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 pt-4 border-t border-gray-100 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>
                {deliveryCharge === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">FREE</span>
                ) : (
                  formatPrice(deliveryCharge)
                )}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount ({appliedCoupon})</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black text-odiva-dark pt-3 border-t">
              <span>Total Payable</span>
              <span className="text-xl text-odiva-forest">{formatPrice(total)}</span>
            </div>
          </div>

          {orderError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
              {orderError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isServiceable}
            className="w-full py-3.5 bg-gradient-to-r from-odiva-forest to-emerald-800 hover:from-emerald-800 hover:to-odiva-forest disabled:opacity-50 text-white rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{isSubmitting ? "Confirming Order..." : t.checkout.placeOrder}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-gray-400 text-center font-medium">
            🔒 By placing this order you agree to ODIVA&apos;s Terms of Service and Delivery Policies.
          </p>
        </div>
      </form>
    </div>
  );
}
