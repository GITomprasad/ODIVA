import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/store";
import { OrderItem } from "@/types";

export async function GET() {
  const orders = dataStore.getOrders();
  return NextResponse.json({ success: true, count: orders.length, orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      cartItems,
      paymentMethod,
      couponCode,
    } = body;

    if (!customerName || !customerPhone || !shippingAddress || !cartItems?.length) {
      return NextResponse.json(
        { success: false, error: "Missing required order information." },
        { status: 400 }
      );
    }

    // Server-side recalculation
    const calculation = dataStore.calculateCart(
      cartItems.map((i: { productId: string; quantity: number }) => ({
        productId: i.productId,
        quantity: i.quantity,
      })),
      couponCode,
      shippingAddress.pincode
    );

    if (calculation.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid or in-stock items in cart." },
        { status: 400 }
      );
    }

    const orderItems: OrderItem[] = calculation.items.map((ci) => ({
      productId: ci.product.id,
      productName: ci.product.name,
      odiaName: ci.product.odiaName,
      packSize: ci.product.packSize,
      unitPrice: ci.product.price,
      quantity: ci.quantity,
      totalPrice: ci.product.price * ci.quantity,
      imageUrl: ci.product.imageUrl,
    }));

    const newOrder = dataStore.createOrder({
      status: "confirmed",
      customerName,
      customerPhone,
      customerEmail: customerEmail || "",
      shippingAddress,
      items: orderItems,
      subtotal: calculation.subtotal,
      deliveryCharge: calculation.deliveryCharge,
      discount: calculation.discount,
      couponCode: couponCode || undefined,
      total: calculation.total,
      paymentMethod: paymentMethod || "cod",
      paymentStatus: paymentMethod === "razorpay" ? "paid" : "pending",
      estimatedDelivery: calculation.serviceText || "Within 60 mins",
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
