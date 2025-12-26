"use client";

import Cart from "./svg/cart";

export default function ShoppingCart() {
  return (
    <button
      type="button"
      onClick={() => {
        console.log("Add to cart:");
      }}
      className="flex absolute justify-center items-center w-[32px] h-[32px] p-[4px] rounded-[6px] top-[20px] left-[20px] min-desktop:top-[30px] min-desktop:left-[30px] cursor-pointer bg-black"
    >
      <Cart />
    </button>
  );
}
