"use client";

import { ProductsPageProductCard } from "@/util/types";

import Cart from "./svg/cart";
import { addToCartAction } from "@/util/server-action";
export default function ShoppingCart({
  product,
}: {
  product: ProductsPageProductCard;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        console.log("Add to cart:");
        addToCartAction({
          id: product.id,
          name: product.name,
          variantId: product.variants[0].id,
          price: product.variants[0].price,
          quantity: 1,
          subtotal: product.variants[0].price,
        });
      }}
      className="flex absolute justify-center items-center w-[32px] h-[32px] p-[4px] rounded-[6px] top-[20px] left-[20px] min-desktop:top-[30px] min-desktop:left-[30px] cursor-pointer bg-black"
    >
      <Cart />
    </button>
  );
}
