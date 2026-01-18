import { categoriesNameList } from "@/util/fetching-data";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categories = await categoriesNameList();
    console.log("CATEGORIES:", categories);

    if (!categories) {
      return NextResponse.json(
        { message: "Categories not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (e) {
    console.log("Error fetching categories:", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
