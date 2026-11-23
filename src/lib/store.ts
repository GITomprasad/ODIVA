import {
  Product,
  Order,
  OrderStatus,
  Review,
  Producer,
  FestivalCollection,
  WasteOffer,
  CartItem,
} from "@/types";
import { PRODUCTS } from "@/data/products";
import { RECIPES } from "@/data/recipes";
import { FESTIVALS } from "@/data/festivals";
import { PRODUCERS } from "@/data/farmers";
import { WASTE_OFFERS } from "@/data/wasteOffers";
import { SERVICEABLE_PINCODES } from "@/data/deliveryZones";

export interface Coupon {
  code: string;
  type: "flat" | "percentage";
  value: number;
  minOrder: number;
  maxDiscount?: number;
  description: string;
}

export const ACTIVE_COUPONS: Coupon[] = [
  {
    code: "ODIVA100",
    type: "flat",
    value: 100,
    minOrder: 499,
    description: "Flat ₹100 OFF on orders above ₹499",
  },
  {
    code: "AMAODISHA",
    type: "percentage",
    value: 15,
    minOrder: 399,
    maxDiscount: 150,
    description: "15% OFF up to ₹150 for Odisha authentic baskets",
  },
  {
    code: "FIRST50",
    type: "flat",
    value: 50,
    minOrder: 299,
    description: "Flat ₹50 OFF on your first purchase",
  },
];

// Global in-memory mutable state for runtime persistence in Next.js server/client
class OdivaDataStore {
  private products: Product[] = [...PRODUCTS];
  private orders: Order[] = [
    {
      id: "ord-demo-001",
      orderNumber: "ODV-2026-8910",
      createdAt: "2026-11-22T14:30:00Z",
      status: "out_for_delivery",
      customerName: "Soumya Ranjan Dash",
      customerPhone: "+91 94371 22890",
      customerEmail: "soumya.dash@odiva.example.com",
      shippingAddress: {
        fullName: "Soumya Ranjan Dash",
        phone: "+91 94371 22890",
        street: "Plot No. 412, Saheed Nagar",
        landmark: "Near Maharshi College",
        city: "Bhubaneswar",
        district: "Khordha",
        pincode: "751007",
        state: "Odisha",
      },
      items: [
        {
          productId: "odiva-chhena-poda-nayagarh",
          productName: "GI-Certified Nayagarh Chhena Poda",
          odiaName: "ନୟାଗଡ଼ ସୁପ୍ରସିଦ୍ଧ ଛେନାପୋଡ଼",
          packSize: "500 g box",
          unitPrice: 240,
          quantity: 1,
          totalPrice: 240,
          imageUrl: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80",
        },
        {
          productId: "odiva-keonjhar-phula-badi",
          productName: "Handmade Keonjhar Phula Badi",
          odiaName: "କେନ୍ଦୁଝର ପ୍ରସିଦ୍ଧ ଫୁଲ ବଡ଼ି",
          packSize: "200 g",
          unitPrice: 85,
          quantity: 2,
          totalPrice: 170,
          imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        },
      ],
      subtotal: 410,
      deliveryCharge: 0,
      discount: 50,
      couponCode: "FIRST50",
      total: 360,
      paymentMethod: "cod",
      paymentStatus: "pending",
      estimatedDelivery: "Today, by 4:30 PM",
      trackingUpdates: [
        { status: "confirmed", time: "2026-11-22 14:35", description: "Order confirmed by ODIVA Master Kitchen." },
        { status: "processing", time: "2026-11-22 14:45", description: "Fresh Chhena Poda and Keonjhar Badis packed with safety seals." },
        { status: "packed", time: "2026-11-22 15:05", description: "Handed over to Bhubaneswar express delivery executive." },
        { status: "out_for_delivery", time: "2026-11-22 15:25", description: "Delivery partner (Rakesh Sahoo) is en route." },
      ],
    },
    {
      id: "ord-demo-002",
      orderNumber: "ODV-2026-7643",
      createdAt: "2026-11-21T09:15:00Z",
      status: "delivered",
      customerName: "Priyadarshini Mohanty",
      customerPhone: "+91 98610 54321",
      customerEmail: "priya.m@odiva.example.com",
      shippingAddress: {
        fullName: "Priyadarshini Mohanty",
        phone: "+91 98610 54321",
        street: "Bidanasi, CDA Sector 6",
        landmark: "Near Biju Patnaik Park",
        city: "Cuttack",
        district: "Cuttack",
        pincode: "753014",
        state: "Odisha",
      },
      items: [
        {
          productId: "odiva-usuna-rice",
          productName: "Golden Usuna Rice (Parboiled)",
          odiaName: "ଦେଶୀ ଉଷୁନା ଚାଉଳ",
          packSize: "1 kg",
          unitPrice: 52,
          quantity: 5,
          totalPrice: 260,
          imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
        },
        {
          productId: "odiva-moong-dal-desi",
          productName: "Desi Yellow Moong Dal (Split)",
          odiaName: "ଦେଶୀ ମୁଗ ଡାଲି",
          packSize: "1 kg",
          unitPrice: 128,
          quantity: 2,
          totalPrice: 256,
          imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        },
      ],
      subtotal: 516,
      deliveryCharge: 0,
      discount: 100,
      couponCode: "ODIVA100",
      total: 416,
      paymentMethod: "razorpay",
      paymentStatus: "paid",
      estimatedDelivery: "Delivered on Nov 21",
      trackingUpdates: [
        { status: "confirmed", time: "2026-11-21 09:20", description: "Order confirmed." },
        { status: "packed", time: "2026-11-21 09:40", description: "Package dispatched from Cuttack hub." },
        { status: "delivered", time: "2026-11-21 11:15", description: "Delivered to customer." },
      ],
    },
  ];

  // Products
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id || p.slug === id);
  }

  addProduct(product: Product): Product {
    this.products.unshift(product);
    return product;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates, updatedAt: new Date().toISOString() };
    return this.products[idx];
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // Orders
  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "trackingUpdates">): Order {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ODV-${new Date().getFullYear()}-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      trackingUpdates: [
        {
          status: "confirmed",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          description: "Order confirmed by ODIVA. Your items are being prepared.",
        },
      ],
    };

    // Deduct stock safely on server
    for (const item of newOrder.items) {
      const prod = this.getProductById(item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    }

    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    order.trackingUpdates.push({
      status,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      description: `Status updated to ${status.replace(/_/g, " ").toUpperCase()}`,
    });
    return order;
  }

  // Validate coupon
  validateCoupon(code: string, subtotal: number): { valid: boolean; discount: number; message: string } {
    const clean = code.trim().toUpperCase();
    const coupon = ACTIVE_COUPONS.find((c) => c.code === clean);
    if (!coupon) {
      return { valid: false, discount: 0, message: "Invalid coupon code." };
    }
    if (subtotal < coupon.minOrder) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order of ₹${coupon.minOrder} required for coupon ${coupon.code}.`,
      };
    }
    let discount = 0;
    if (coupon.type === "flat") {
      discount = coupon.value;
    } else {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }
    return {
      valid: true,
      discount: Math.min(discount, subtotal),
      message: `Coupon ${coupon.code} applied successfully! You saved ₹${discount}.`,
    };
  }

  // Recalculate cart totals securely on server
  calculateCart(items: { productId: string; quantity: number }[], couponCode?: string, pincode?: string) {
    let subtotal = 0;
    const validatedItems: CartItem[] = [];

    for (const item of items) {
      const product = this.getProductById(item.productId);
      if (product && product.isAvailable && product.stock > 0) {
        const qty = Math.min(item.quantity, product.stock);
        subtotal += product.price * qty;
        validatedItems.push({
          product,
          quantity: qty,
        });
      }
    }

    // Delivery fee check
    let deliveryCharge = 0;
    if (subtotal > 0 && subtotal < 299) {
      deliveryCharge = 35; // Standard fee below free delivery threshold
    }

    // Pincode validation
    let isServiceable = true;
    let serviceText = "Standard Delivery";
    if (pincode) {
      const pMatch = SERVICEABLE_PINCODES.find((p) => p.pincode === pincode.trim());
      if (pMatch) {
        isServiceable = pMatch.isServiceable;
        serviceText = pMatch.estimatedDeliveryText;
        if (subtotal > 0 && subtotal < 299) {
          deliveryCharge = pMatch.deliveryFee;
        }
      } else {
        isServiceable = false;
        serviceText = "Coming Soon to this Pincode";
      }
    }

    let discount = 0;
    let couponMessage = "";
    if (couponCode) {
      const couponRes = this.validateCoupon(couponCode, subtotal);
      if (couponRes.valid) {
        discount = couponRes.discount;
        couponMessage = couponRes.message;
      }
    }

    const total = Math.max(0, subtotal - discount + deliveryCharge);

    return {
      items: validatedItems,
      subtotal,
      deliveryCharge,
      discount,
      total,
      isServiceable,
      serviceText,
      couponMessage,
    };
  }
}

// Singleton instance across server execution
export const dataStore = new OdivaDataStore();
