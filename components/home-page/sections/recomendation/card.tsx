"use client";
import Link from "next/link";
import Image from "next/image";
import ShoppingCart from "../../svg/shopping-cart";
import { imageLoader } from "@/util/image-loader";
import { RecommendedProduct } from "@/util/types";

export default function Card({
  product: { id, name, imgUrls, category, price, prevPrice },
}: {
  product: RecommendedProduct;
}) {
  const addToCartHandler = () => {
    console.log("Added to cart");
  };
  return (
    <div className="flex relative w-full">
      <button
        onClick={addToCartHandler}
        className="w-[32px] h-[32px] absolute top-[32px] left-[32px] flex items-center justify-center bg-recomendation-background text-white z-1 rounded-[6px]"
      >
        <ShoppingCart />
      </button>
      <Link className="w-full" href={`/product/${id}`}>
        <div className="w-[300px] h-[386px] p-[16px] pb-[20px] flex flex-col gap-[18px] border-[1px] bg-recomendation-background text-recomendation-text border-line rounded-[6px]">
          <div className="w-[268px] h-[204px] relative flex justify-center object-contain">
            <Image
              loader={(config) => imageLoader(config, "")}
              src={imgUrls}
              alt={`${name} iamge`}
              fill
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex w-fit h-[36px] px-[6px] py-[10px] text-14-24-500 items-center text-recomendation-category-text bg-recomendation-category-background rounded-[6px]">
              {category}
            </div>
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-18-28-400 text-recomendation-text">{name}</h3>
              <div className="flex gap-[10px] items-center">
                <p className="text-28-40-600 tracking-[0.015rem]">${price}</p>
                {prevPrice && (
                  <p className="text-18-28-400 line-through text-recomendation-text-secondary">
                    ${prevPrice}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
