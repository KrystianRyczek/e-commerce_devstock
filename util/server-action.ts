"use server";

import { CartProduct } from "./types";

export const action = async (formData: FormData) => {
  "use server";
  // Extract all form data as an object
  const category: string[] | null = formData
    .getAll("category")
    .map((value) => value.toString());
  console.log("📋 All form data:", category);
  const selectedAllCategory = formData.get("categoryAll");
  console.log("📋 'All' category selected", selectedAllCategory);
  const brand: string[] | null = formData
    .getAll("brand")
    .map((value) => value.toString());
  console.log("📋 All form data:", brand);
  const show: number = Number(formData.get("show"));
  console.log("📋 Show data:", show);
  const sort: string = String(formData.get("sort"));
  console.log("📋 SortBy:", sort);
  const minPrice: number = Number(formData.get("minPrice"));
  console.log("📋 Min Price:", minPrice);
  const minPriceCurrency: string = String(formData.get("minPriceCurrency"));
  console.log("📋 Currency:", minPriceCurrency);
  const maxPrice: number = Number(formData.get("maxPrice"));
  console.log("📋 Max Price:", maxPrice);
  const maxPriceCurrency: string = String(formData.get("maxPriceCurrency"));
  console.log("📋 Currency:", maxPriceCurrency);

  return {
    brand,
    category,
    show,
    sort,
    minPrice,
    minPriceCurrency,
    maxPrice,
    maxPriceCurrency,
    errors: [],
  };
};

export const addToCartAction = async (product: CartProduct) => {
  "use server";
  console.log("Adding to cart:", product);
};
