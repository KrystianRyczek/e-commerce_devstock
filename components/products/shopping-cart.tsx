"use client";

import { ProductsPageProductCard } from "@/util/types";
import Cart from "./svg/cart";
import { addToCartAction } from "@/util/server-action";
import { useEffect, useRef, useState } from "react";
import MsgBox from "@/components/toast/message-box";

export default function ShoppingCart({
  product,
}: {
  product: ProductsPageProductCard;
}) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = async () => {
    console.log("Add to cart:");
    const response = await addToCartAction({
      id: product.id,
      name: product.name,
      variantId: product.variants[0].id,
      price: product.variants[0].price,
      quantity: 1,
      subtotal: product.variants[0].price,
    });
    setToast({
      show: true,
      message: response.message,
      type: response.success ? "success" : "error",
    });
  };
  useEffect(() => {
    if (toast.show) {
      timer.current = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [toast]);
  return (
    <>
      {toast.show ? <MsgBox type={toast.type} msg={toast.message} /> : null}
      <button
        type="button"
        onClick={handleAddToCart}
        className="flex absolute justify-center items-center w-[32px] h-[32px] p-[4px] rounded-[6px] top-[20px] left-[20px] min-desktop:top-[30px] min-desktop:left-[30px] cursor-pointer bg-black"
      >
        <Cart />
      </button>
    </>
  );
}
