import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("q")?.toLowerCase();
  const district = searchParams.get("district");
  const special = searchParams.get("special");
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;

  let products = dataStore.getProducts();

  // Category filter
  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  // District origin filter
  if (district) {
    products = products.filter(
      (p) => p.districtOrigin?.toLowerCase() === district.toLowerCase()
    );
  }

  // Odisha special filter
  if (special === "true") {
    products = products.filter((p) => p.isOdishaSpecial);
  }

  // Price range
  if (minPrice !== null) {
    products = products.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== null) {
    products = products.filter((p) => p.price <= maxPrice);
  }

  // Multi-term and transliteration search
  if (search) {
    products = products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(search);
      const matchOdia = p.odiaName.toLowerCase().includes(search);
      const matchDesc = p.description.toLowerCase().includes(search);
      const matchKeywords = p.searchKeywords?.some((kw) => kw.toLowerCase().includes(search));
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(search));
      return matchName || matchOdia || matchDesc || matchKeywords || matchTags;
    });
  }

  // Sorting
  if (sort === "price-low") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  } else if (sort === "discount") {
    products.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
  } else {
    // default: best sellers and featured first
    products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  }

  return NextResponse.json({
    success: true,
    count: products.length,
    products,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const newProduct = dataStore.addProduct({
      ...body,
      id: body.id || `odiva-${Date.now()}`,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      stock: body.stock ?? 50,
      isAvailable: body.isAvailable ?? true,
      rating: 5.0,
      reviewCount: 0,
      imageUrl: body.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
