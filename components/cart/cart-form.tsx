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
  const selllectNoneHandler = (id: number) => {
    setCartProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex(
        (product) => product.id === id
      );
      if (productIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          selected: !updatedProducts[productIndex].selected,
        };
        return updatedProducts;
      }
      return prevProducts;
    });
  };

  return (
    <form className="flex flex-col gap-[32px] w-[889px] max-desktop:w-full">
      <CartCheckbox
        label="Select All Items"
        checked={cartProducts.every((product) => product.selected)}
        onChange={sellectAllHandler}
      />
      {cartProducts.map((product) => (
        <CartCard
          key={product.id}
          product={product}
          selllectNoneHandler={selllectNoneHandler}
        />
      ))}
    </form>
  );
}
