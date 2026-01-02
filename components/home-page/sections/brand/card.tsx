"use client";
import Image from "next/image";
import { imageLoader } from "@/util/image-loader";
import { SectionCard } from "@/util/types";
import Link from "next/link";

export default function Card({ image, label }: SectionCard) {
  return (
    <li className="flex w-[220px] max-desktop:w-[120px] h-[190px] max-desktop:h-[150px] rounded-[6px] bg-brand-background border-[1px] border-brand-border ">
      <Link
        href={`products?brands=["${label.toLowerCase()}"]`}
        className="w-full h-full p-[12px] flex flex-col gap-[28px] max-desktop:gap-[18px] justify-center items-center"
      >
        <div className="w-full h-[46px] relative flex justify-center object-contain">
          {image && (
            <Image
              loader={(config) => imageLoader(config, `c_limit,h_46,w_140`)}
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
