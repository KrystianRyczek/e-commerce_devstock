"use client";

import Image from "next/image";
import { SectionCard } from "@/util/types";
import { imageLoader } from "@/util/image-loader";
import Link from "next/link";

export default function Card({ image, label }: SectionCard) {
  return (
    <li className="w-[220px] max-tablet:w-full max-desktop:w-[120px] h-[190px] max-tablet:h-[60px] max-desktop:h-[150px]  rounded-[6px] bg-category-background border-[1px] border-category-border flex">
      <Link
        href={`/products/categories=${label.toLowerCase()}`}
        className="w-full h-full flex min-tablet:flex-col gap-[28px] max-desktop:gap-[18px] min-tablet:justify-center items-center p-[12px]"
      >
        <div className="w-full max-tablet:w-1/4 h-[46px] relative flex justify-center text-category-text">
          {image && (
            <Image
              loader={(config) =>
                imageLoader(config, `/c_fill,g_center,h_80,w_80`)
              }
              src={image}
              alt={`${label} brand iamge`}
              fill={true}
              className="object-contain"
            />
          )}
        </div>
        <h3 className="text-20-30-500 -tracking-[0.02rem]">{label}</h3>
      </Link>
    </li>
  );
}
