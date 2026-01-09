"use client";

import Image from "next/image";
import { imageLoader } from "@/util/image-loader";
type PaymentListItem = {
  img: string;
  alt: string;
};

export default function PaymentListItem({ img, alt }: PaymentListItem) {
  return (
    <li className="w-[47px] h-[30px] bg-white rounded-[5px] flex justify-center items-center">
      <Image
        loader={(config) =>
          imageLoader(config, `/c_fill,g_center,c_limit,h_30,w_46`)
        }
        src={img}
        alt={alt}
        width={33}
        height={11}
      />
    </li>
  );
}
