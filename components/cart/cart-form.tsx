"use client";
import type { CartProduct } from "@/app/cart/page";
import CartCard from "./cart-card";
import CartCheckbox from "./cart-checkbox";

export default function CartForm({
  cartProducts,
  setCartProducts,
}: {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}) {
  const sellectAllHandler = () => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        selected: true,
      }))
    );
  };
  return (
    <form className="flex flex-col gap-[32px] w-[889px] max-desktop:w-full">
      <div className="flex gap-[16px] w-full max-tablet:pr-[16px] max-tablet:flex-row-reverse">
        <CartCheckbox
          label="Select All Items"
          style="flex items-center cursor-pointer"
          checked={cartProducts.every((product) => product.selected)}
          onChange={sellectAllHandler}
        />
        <p>Select All Items</p>
      </div>
      {cartProducts.map((product, index) => (
        <CartCard
          key={index}
          product={product}
          setCartProducts={setCartProducts}
        />
      ))}
    </form>
  );
}
