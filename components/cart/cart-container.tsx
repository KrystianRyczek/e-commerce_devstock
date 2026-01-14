"use client";

import CartForm from "@/components/cart/cart-form";
import CheckoutContainer from "@/components/cart/checkout-container";
import type { CartProduct } from "@/app/cart/page";
import { useRef, useState } from "react";

export default function CartContainer({
  products,
}: {
  products: CartProduct[];
}) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(products);
  const formRef = useRef<HTMLFormElement>(null);
  const totalPrice = +cartProducts
    .filter((product) => product.selected)
    .reduce((sum, product) => sum + +product.price * +product.quantity, 0)
    .toFixed(2);

  return (
    <div className="flex max-desktop:flex-col w-full gap-[48px] mx-auto">
      <CartForm cartProducts={products} />
    </div>
  );
}
