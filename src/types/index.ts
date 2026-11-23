export type ProductCategory =
  | "rice-grains"
  | "pulses-lentils"
  | "fresh-vegetables"
  | "fruits"
  | "spices-cooking"
  | "dairy-essentials"
  | "odia-sweets-snacks"
  | "household-essentials";

export interface Product {
  id: string;
  name: string;
  odiaName: string;
  slug: string;
  category: ProductCategory;
  description: string;
  odiaDescription?: string;
  price: number;
  originalPrice?: number;
  packSize: string;
  stock: number;
  isAvailable: boolean;
  discountPercent?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isOdishaSpecial?: boolean;
  isFreshArrival?: boolean;
  isBestSeller?: boolean;
  districtOrigin?: string; // e.g., "Nayagarh", "Keonjhar", "Koraput", "Puri"
  isFarmerDirect?: boolean;
  producerId?: string;
  expiryDate?: string; // YYYY-MM-DD
  tags?: string[];
  searchKeywords?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  odiaName: string;
  slug: string;
  iconName: string;
  accentColor: string;
  cardBg: string;
  textColor: string;
  itemCount: number;
  description: string;
}

export interface RecipeIngredient {
  name: string;
  odiaName: string;
  amount: number;
  unit: string;
  productId?: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  odiaName: string;
  slug: string;
  description: string;
  odiaDescription?: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Expert";
  servings: number;
  imageUrl: string;
  category: "Traditional Meals" | "Pitha & Sweets" | "Curries & Dal" | "Breakfast & Tiffin";
  ingredients: RecipeIngredient[];
  instructions: string[];
  odiaInstructions?: string[];
  relatedProductIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
  product: Product;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  district: string;
  pincode: string;
  state: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "packed"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  odiaName: string;
  packSize: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: DeliveryAddress;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: "cod" | "razorpay";
  paymentStatus: "pending" | "paid" | "failed";
  estimatedDelivery: string;
  trackingUpdates: {
    status: OrderStatus;
    time: string;
    description: string;
  }[];
}

export interface DeliveryPincode {
  pincode: string;
  city: string;
  district: string;
  isServiceable: boolean;
  minOrder: number;
  deliveryFee: number;
  estimatedDeliveryText: string;
}

export interface WasteOffer {
  id: string;
  productId: string;
  discountPercent: number;
  discountedPrice: number;
  originalPrice: number;
  expiryDate: string;
  daysRemaining: number;
  stockAvailable: number;
}

export interface FestivalCollection {
  id: string;
  name: string;
  odiaName: string;
  slug: string;
  tagline: string;
  bannerColor: string;
  imageUrl: string;
  eventDates: string;
  productIds: string[];
}

export interface Producer {
  id: string;
  name: string;
  district: string;
  village: string;
  specialty: string;
  photoUrl: string;
  bio: string;
  verifiedSince: string;
  cooperativeName?: string;
  productIds: string[];
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
