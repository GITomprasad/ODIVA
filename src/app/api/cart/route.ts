import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, couponCode, pincode } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ success: false, error: "Invalid items" }, { status: 400 });
    }

    const calculated = dataStore.calculateCart(items, couponCode, pincode);

    return NextResponse.json({
      success: true,
      data: calculated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
