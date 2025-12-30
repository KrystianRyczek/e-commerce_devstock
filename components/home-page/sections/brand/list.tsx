import type { StaticImageData } from "next/image";
import Card from "./card";
import ROG from "@/public/brands/rog.png";
import Logitech from "@/public/brands/logitech.png";
import JBL from "@/public/brands/jbl.png";
import AOC from "@/public/brands/aoc.png";
import Razer from "@/public/brands/razer.png";
import Rexus from "@/public/brands/rexus.png";
type BrandArray = {
  name: string;
  image: string;
};
export default function BrandList() {
  const brandArray: BrandArray[] = [
    {
      name: "ROG",
      image: "https://res.cloudinary.com/dts7qcxky/image/upload/rog_h81d2d",
    },
    {
      name: "Logitech",
      image:
        "https://res.cloudinary.com/dts7qcxky/image/upload/logitech_cbpk0x",
    },
    {
      name: "JBL",
      image: "https://res.cloudinary.com/dts7qcxky/image/upload/jbl_yp5wcx",
    },
    {
      name: "AOC",
      image: "https://res.cloudinary.com/dts7qcxky/image/upload/aoc_gwjakr",
    },
    {
      name: "Razer",
      image: "https://res.cloudinary.com/dts7qcxky/image/upload/razer_oshngt",
    },
  ];

  return (
    <ul className="flex w-[1480px] gap-[30px]">
      {brandArray.map((brand) => (
        <Card key={brand.name} image={brand.image} label={brand.name} />
      ))}
    </ul>
  );
}
