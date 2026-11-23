import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/store";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = dataStore.getProductById(params.id);
  if (!product) {
    return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, product });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = dataStore.updateProduct(params.id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleted = dataStore.deleteProduct(params.id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Product deleted" });
}
