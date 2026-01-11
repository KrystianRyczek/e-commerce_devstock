"use client";
import Link from "next/link";
import Image from "next/image";
import ShoppingCart from "../../svg/shopping-cart";
import { imageLoader } from "@/util/image-loader";
import { RecommendedProduct } from "@/util/types";
import { addToCartAction } from "@/util/server-action";
import { use, useEffect, useRef, useState } from "react";
import MsgBox from "@/components/toast/message-box";

export default function Card({ product }: { product: RecommendedProduct }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = async () => {
    const response = await addToCartAction({
      id: product.id,
      name: product.name,
      variantId: product.variantId,
      price: product.price,
      quantity: 1,
      subtotal: product.price,
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
      <div className="flex relative w-full">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-[32px] h-[32px] absolute top-[32px] left-[32px] flex items-center justify-center bg-recomendation-background text-white z-1 rounded-[6px]"
        >
          <ShoppingCart />
        </button>
        <Link className="w-full" href={`/product/${product.id}`}>
          <div className="w-[300px] h-[386px] p-[16px] pb-[20px] flex flex-col gap-[18px] border-[1px] bg-recomendation-background text-recomendation-text border-line rounded-[6px]">
            <div className="w-[268px] h-[204px] relative flex justify-center object-contain">
              <Image
                loader={(config) => imageLoader(config, "")}
                src={product.imgUrls}
                alt={`${product.name} image`}
                fill
              />
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="flex w-fit h-[36px] px-[6px] py-[10px] text-14-24-500 items-center text-recomendation-category-text bg-recomendation-category-background rounded-[6px]">
                {product.category}
              </div>
              <div className="flex flex-col gap-[8px]">
                <h3 className="text-18-28-400 text-recomendation-text">
                  {product.name}
                </h3>
                <div className="flex gap-[10px] items-center">
                  <p className="text-28-40-600 tracking-[0.015rem]">
                    ${product.price}
                  </p>
                  {product.prevPrice > 0 && (
                    <p className="text-18-28-400 line-through text-recomendation-text-secondary">
                      ${product.prevPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
