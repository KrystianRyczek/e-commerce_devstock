import { productsArray } from "@/util/fetching-data";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const products = await productsArray();
    console.log("PRODUCTS:", products);

    if (!products) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (e) {
    console.log("Error fetching product:", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
