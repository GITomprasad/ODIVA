"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { notFound, useParams, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  Phone,
  HelpCircle,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Order, OrderStatus } from "@/types";
import { formatPrice } from "@/lib/utils";

const ORDER_STEPS: { status: OrderStatus; label: string; icon: string }[] = [
  { status: "confirmed", label: "Confirmed", icon: "✓" },
  { status: "processing", label: "Processing", icon: "⏳" },
  { status: "packed", label: "Packed", icon: "📦" },
  { status: "out_for_delivery", label: "Out for Delivery", icon: "🚚" },
  { status: "delivered", label: "Delivered", icon: "🏠" },
];

function OrderTrackingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params?.id as string;
  const isNewOrder = searchParams.get("success") === "true";
  const { language } = useLanguage();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch (e) {
        console.error("Order fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin text-3xl">⏳</div>
        <p className="text-xs text-gray-500 mt-2">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-3">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold">Order Not Found</h2>
        <p className="text-xs text-gray-500">
          We couldn&apos;t find an order with number {orderId}.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2 bg-odiva-forest text-white rounded-full text-xs font-bold"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const currentStepIdx = ORDER_STEPS.findIndex((s) => s.status === order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Success banner if redirected from checkout */}
      {isNewOrder && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-3xl text-emerald-950 flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
          <div>
            <h3 className="font-black text-sm">Thank you! Your order has been placed.</h3>
            <p className="text-xs text-emerald-800">
              Our Bhubaneswar / Cuttack fulfillment center is preparing your fresh basket.
            </p>
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-odiva-border shadow-sm">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            ODIVA Order Reference
          </span>
          <h1 className="text-2xl font-black text-odiva-dark">{order.orderNumber}</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
            {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-odiva-cream text-odiva-forest border border-odiva-border">
            Status: {order.status.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      {/* Visual Step Tracker */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-odiva-border shadow-sm space-y-6">
        <h2 className="font-black text-base text-odiva-dark">Delivery Progress</h2>

        <div className="relative">
          <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-gray-100 -z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10">
            {ORDER_STEPS.map((step, idx) => {
              const isPassed = currentStepIdx >= idx;
              const isCurrent = currentStepIdx === idx;

              return (
                <div key={step.status} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-transform shadow-xs mb-2 ${
                      isPassed
                        ? "bg-odiva-forest text-white"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    } ${isCurrent ? "scale-110 ring-4 ring-odiva-turmeric/50" : ""}`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isPassed ? "text-odiva-dark" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Updates Feed */}
        <div className="pt-4 border-t border-gray-100 space-y-2">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Timeline Updates
          </h4>
          <div className="space-y-2">
            {order.trackingUpdates?.map((update, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-xl text-xs"
              >
                <Clock className="w-3.5 h-3.5 text-odiva-orange flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold text-gray-800">{update.description}</span>
                  <span className="text-[10px] text-gray-400 ml-2">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Items */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-4">
          <h2 className="font-black text-base text-odiva-dark">
            Purchased Groceries ({order.items.length})
          </h2>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-12 h-12 rounded-xl object-cover border bg-white"
                  />
                  <div>
                    <h4 className="font-bold text-odiva-dark">{item.productName}</h4>
                    <p className="text-[11px] text-odiva-orange font-semibold">{item.odiaName}</p>
                    <p className="text-[10px] text-gray-400">
                      Qty: {item.quantity} • {item.packSize}
                    </p>
                  </div>
                </div>
                <span className="font-black text-sm text-odiva-forest">
                  {formatPrice(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{order.deliveryCharge === 0 ? "FREE" : formatPrice(order.deliveryCharge)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black text-odiva-dark pt-2 border-t">
              <span>Total Paid</span>
              <span className="text-xl text-odiva-forest">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address & Help */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-odiva-border shadow-sm space-y-3 text-xs">
            <h3 className="font-black text-sm text-odiva-dark flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-odiva-orange" />
              <span>Delivery Address</span>
            </h3>
            <p className="font-bold text-gray-800">{order.shippingAddress.fullName}</p>
            <p className="text-gray-600">{order.shippingAddress.street}</p>
            {order.shippingAddress.landmark && (
              <p className="text-gray-500">Landmark: {order.shippingAddress.landmark}</p>
            )}
            <p className="text-gray-800 font-semibold">
              {order.shippingAddress.city}, Odisha - {order.shippingAddress.pincode}
            </p>
            <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
          </div>

          <div className="bg-odiva-cream rounded-3xl p-6 border border-odiva-border shadow-sm space-y-2 text-xs">
            <h3 className="font-bold text-sm text-odiva-forest flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-odiva-forest" />
              <span>Need help with this order?</span>
            </h3>
            <p className="text-gray-600">
              Our Bhubaneswar customer care desk is active 7:00 AM - 10:00 PM.
            </p>
            <p className="font-bold text-odiva-forest text-sm">+91 674 254 9900</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-20 text-center text-xs text-gray-500">Loading order tracker...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
