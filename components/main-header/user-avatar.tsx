"use client";
import Image from "next/image";
import { imageLoader } from "@/util/image-loader";

export default function UserAvatar({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="flex relative w-[25px] h-[25px]">
      <Image
        loader={(config) => imageLoader(config, ``)}
        src={avatarUrl}
        alt={`User avatar`}
        fill={true}
        className="rounded-full object-cover"
      />
    </div>
  );
}
