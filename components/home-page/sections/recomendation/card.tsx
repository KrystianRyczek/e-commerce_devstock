import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import ShoppingCart from "./shopping-cart";

type Product = {
  name: string;
  image: StaticImageData;
  category: string;
  price: number;
  promo: number | boolean;
};
export default function Card({ name, image, category, price, promo }: Product) {
  return (
    <div className="w-[300px] h-[386px] p-[16px] pb-[20px] flex flex-col gap-[18px] border-[1px] bg-recomendation-backgroud text-recomendation-text border-line rounded-[6px]">
      <div className="w-[268px] h-[204px] relative flex justify-center object-contain">
        <div className="w-[32px] h-[32px] absolute top-[16px] left-[16px] flex items-center justify-center bg-recomendation-backgroud z-1 rounded-[6px]">
          <ShoppingCart />
        </div>
        <Image src={image} alt={`${name} iamge`} fill />
      </div>
      <div className="flex flex-col gap-[16px]">
        <Link
          className="flex w-fit h-[36px] px-[6px] py-[10px] text-[14px] leading-[24px] font-[500] items-center text-recomendation-category-text bg-recomendation-category-backgroud rounded-[6px]"
          href={"/"}
        >
          {category}
        </Link>
        <div className="flex flex-col gap-[8px]">
          <h3 className="text-[18px] leading-[28px] font-[400]">{name}</h3>
          <div className="flex gap-[10px] items-center">
            <p className="text-[28px] leading-[40px] tracking-[0.015rem] font-[600]">
              ${price}
            </p>
            {promo && (
              <p className="text-[18px] leading-[28px] font-[400] line-through">
                ${promo}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
