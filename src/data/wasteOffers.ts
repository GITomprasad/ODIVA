import { WasteOffer } from "@/types";

export const WASTE_OFFERS: WasteOffer[] = [
  {
    id: "waste-offer-1",
    productId: "odiva-cow-milk-fresh",
    discountPercent: 35,
    discountedPrice: 21,
    originalPrice: 32,
    expiryDate: "2026-11-25", // 2 days left
    daysRemaining: 2,
    stockAvailable: 14,
  },
  {
    id: "waste-offer-2",
    productId: "odiva-curd-dahi",
    discountPercent: 40,
    discountedPrice: 27,
    originalPrice: 45,
    expiryDate: "2026-11-26", // 3 days left
    daysRemaining: 3,
    stockAvailable: 8,
  },
  {
    id: "waste-offer-3",
    productId: "odiva-spinach-palanga",
    discountPercent: 50,
    discountedPrice: 11,
    originalPrice: 22,
    expiryDate: "2026-11-24", // 1 day left
    daysRemaining: 1,
    stockAvailable: 12,
  },
  {
    id: "waste-offer-4",
    productId: "odiva-chakuli-pitha-batter",
    discountPercent: 45,
    discountedPrice: 41,
    originalPrice: 75,
    expiryDate: "2026-11-25", // 2 days left
    daysRemaining: 2,
    stockAvailable: 6,
  },
  {
    id: "waste-offer-5",
    productId: "odiva-banana-champa",
    discountPercent: 40,
    discountedPrice: 29,
    originalPrice: 48,
    expiryDate: "2026-11-26", // 3 days left
    daysRemaining: 3,
    stockAvailable: 10,
  },
  {
    id: "waste-offer-6",
    productId: "odiva-chhena-poda-nayagarh",
    discountPercent: 30,
    discountedPrice: 168,
    originalPrice: 240,
    expiryDate: "2026-11-27", // 4 days left
    daysRemaining: 4,
    stockAvailable: 5,
  },
];
