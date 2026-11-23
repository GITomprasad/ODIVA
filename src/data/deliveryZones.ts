import { DeliveryPincode } from "@/types";

export interface CityDeliveryInfo {
  name: string;
  odiaName: string;
  district: string;
  isActive: boolean;
  estimatedDeliveryText: string;
  samplePincode: string;
}

export const CITIES_LIST: CityDeliveryInfo[] = [
  { name: "Bhubaneswar", odiaName: "ଭୁବନେଶ୍ୱର", district: "Khordha", isActive: true, estimatedDeliveryText: "30-60 mins Express Delivery", samplePincode: "751001" },
  { name: "Cuttack", odiaName: "କଟକ", district: "Cuttack", isActive: true, estimatedDeliveryText: "45-90 mins Express Delivery", samplePincode: "753001" },
  { name: "Puri", odiaName: "ପୁରୀ", district: "Puri", isActive: true, estimatedDeliveryText: "Same-Day Delivery (by 6 PM)", samplePincode: "752001" },
  { name: "Berhampur", odiaName: "ବ୍ରହ୍ମପୁର", district: "Ganjam", isActive: true, estimatedDeliveryText: "Same-Day Delivery (by 7 PM)", samplePincode: "760001" },
  { name: "Sambalpur", odiaName: "ସମ୍ବଲପୁର", district: "Sambalpur", isActive: true, estimatedDeliveryText: "Same-Day Delivery", samplePincode: "768001" },
  { name: "Rourkela", odiaName: "ରାଉରକେଲା", district: "Sundargarh", isActive: true, estimatedDeliveryText: "Same-Day Delivery", samplePincode: "769001" },
  { name: "Balasore", odiaName: "ବାଲେଶ୍ୱର", district: "Balasore", isActive: true, estimatedDeliveryText: "Same-Day Delivery", samplePincode: "756001" },
  { name: "Angul", odiaName: "ଅନୁଗୋଳ", district: "Angul", isActive: true, estimatedDeliveryText: "Next-Day Delivery", samplePincode: "759122" },
  { name: "Jharsuguda", odiaName: "ଝାରସୁଗୁଡ଼ା", district: "Jharsuguda", isActive: true, estimatedDeliveryText: "Next-Day Delivery", samplePincode: "768201" },
  { name: "Jajpur", odiaName: "ଯାଜପୁର", district: "Jajpur", isActive: true, estimatedDeliveryText: "Next-Day Delivery", samplePincode: "755001" },
  { name: "Bhadrak", odiaName: "ଭଦ୍ରକ", district: "Bhadrak", isActive: true, estimatedDeliveryText: "Next-Day Delivery", samplePincode: "756100" },
  { name: "Koraput", odiaName: "କୋରାପୁଟ", district: "Koraput", isActive: true, estimatedDeliveryText: "Next-Day Express", samplePincode: "764020" },
  // Non-active examples (Coming Soon)
  { name: "Kandhamal", odiaName: "କନ୍ଧମାଳ", district: "Kandhamal", isActive: false, estimatedDeliveryText: "Coming Soon in Phase 2", samplePincode: "762001" },
  { name: "Mayurbhanj", odiaName: "ମୟୂରଭଞ୍ଜ", district: "Mayurbhanj", isActive: false, estimatedDeliveryText: "Coming Soon in Phase 2", samplePincode: "757001" },
  { name: "Kalahandi", odiaName: "କଳାହାଣ୍ଡି", district: "Kalahandi", isActive: false, estimatedDeliveryText: "Coming Soon in Phase 2", samplePincode: "766001" },
];

export const SERVICEABLE_PINCODES: DeliveryPincode[] = [
  // Bhubaneswar
  { pincode: "751001", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "30-45 mins" },
  { pincode: "751002", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "30-45 mins" },
  { pincode: "751003", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "30-45 mins" },
  { pincode: "751006", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "35-50 mins" },
  { pincode: "751010", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "35-50 mins" },
  { pincode: "751012", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "35-50 mins" },
  { pincode: "751013", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "40-60 mins" },
  { pincode: "751015", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "40-60 mins" },
  { pincode: "751020", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "45-60 mins" },
  { pincode: "751024", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "45-60 mins" },
  { pincode: "751030", city: "Bhubaneswar", district: "Khordha", isServiceable: true, minOrder: 149, deliveryFee: 30, estimatedDeliveryText: "45-60 mins" },
  // Cuttack
  { pincode: "753001", city: "Cuttack", district: "Cuttack", isServiceable: true, minOrder: 149, deliveryFee: 35, estimatedDeliveryText: "45-75 mins" },
  { pincode: "753002", city: "Cuttack", district: "Cuttack", isServiceable: true, minOrder: 149, deliveryFee: 35, estimatedDeliveryText: "45-75 mins" },
  { pincode: "753003", city: "Cuttack", district: "Cuttack", isServiceable: true, minOrder: 149, deliveryFee: 35, estimatedDeliveryText: "45-75 mins" },
  { pincode: "753009", city: "Cuttack", district: "Cuttack", isServiceable: true, minOrder: 149, deliveryFee: 35, estimatedDeliveryText: "50-80 mins" },
  // Puri
  { pincode: "752001", city: "Puri", district: "Puri", isServiceable: true, minOrder: 199, deliveryFee: 40, estimatedDeliveryText: "Same-Day Delivery" },
  { pincode: "752002", city: "Puri", district: "Puri", isServiceable: true, minOrder: 199, deliveryFee: 40, estimatedDeliveryText: "Same-Day Delivery" },
  // Berhampur
  { pincode: "760001", city: "Berhampur", district: "Ganjam", isServiceable: true, minOrder: 199, deliveryFee: 40, estimatedDeliveryText: "Same-Day Delivery" },
  { pincode: "760002", city: "Berhampur", district: "Ganjam", isServiceable: true, minOrder: 199, deliveryFee: 40, estimatedDeliveryText: "Same-Day Delivery" },
  // Sambalpur
  { pincode: "768001", city: "Sambalpur", district: "Sambalpur", isServiceable: true, minOrder: 199, deliveryFee: 40, estimatedDeliveryText: "Same-Day Delivery" },
  // Rourkela
  { pincode: "769001", city: "Rourkela", district: "Sundargarh", isServiceable: true, minOrder: 199, deliveryFee: 40, estimatedDeliveryText: "Same-Day Delivery" },
  // Balasore
  { pincode: "756001", city: "Balasore", district: "Balasore", isServiceable: true, minOrder: 199, deliveryFee: 40, estimatedDeliveryText: "Same-Day Delivery" },
  // Angul
  { pincode: "759122", city: "Angul", district: "Angul", isServiceable: true, minOrder: 199, deliveryFee: 45, estimatedDeliveryText: "Next-Day Delivery" },
  // Jharsuguda
  { pincode: "768201", city: "Jharsuguda", district: "Jharsuguda", isServiceable: true, minOrder: 199, deliveryFee: 45, estimatedDeliveryText: "Next-Day Delivery" },
  // Jajpur
  { pincode: "755001", city: "Jajpur", district: "Jajpur", isServiceable: true, minOrder: 199, deliveryFee: 45, estimatedDeliveryText: "Next-Day Delivery" },
  // Bhadrak
  { pincode: "756100", city: "Bhadrak", district: "Bhadrak", isServiceable: true, minOrder: 199, deliveryFee: 45, estimatedDeliveryText: "Next-Day Delivery" },
  // Koraput
  { pincode: "764020", city: "Koraput", district: "Koraput", isServiceable: true, minOrder: 199, deliveryFee: 50, estimatedDeliveryText: "Next-Day Delivery" },
];

export function checkPincodeServiceability(pincode: string): DeliveryPincode | null {
  const clean = pincode.trim();
  const match = SERVICEABLE_PINCODES.find((p) => p.pincode === clean);
  return match || null;
}
