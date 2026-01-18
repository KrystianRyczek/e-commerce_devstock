"use client";
import Image from "next/image";
import { imageLoader } from "@/util/image-loader";
import { use } from "react";

export default function Avatar({ url }: { url: string }) {
  return (
    <div className="flex  w-[72px] h-[72px] relative">
      <Image
        loader={(config) => imageLoader(config, ``)}
        src={url}
        alt={`User avatar`}
        fill={true}
        className="rounded-full object-cover"
      />
    </div>
  );
}
