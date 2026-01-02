import Image from "next/image";
import { imageLoader } from "@/util/image-loader";

export default function SwipperImageContainer({ url, alt, transformation }) {
  return (
    <div className="relative w-full h-full">
      <Image
        loader={(config) => imageLoader(config, transformation)}
        src={url}
        alt={alt}
        fill
      />
    </div>
  );
}
