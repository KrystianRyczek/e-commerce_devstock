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
  image: StaticImageData;
};
export default function BrandList() {
  const brandArray: BrandArray[] = [
    { name: "ROG", image: ROG },
    { name: "Logitech", image: Logitech },
    { name: "JBL", image: JBL },
    { name: "AOC", image: AOC },
    { name: "Razer", image: Razer },
    { name: "Rexus", image: Rexus },
  ];

  return (
    <ul className="flex w-[1480px] gap-[30px]">
      {brandArray.map((brand) => (
        <Card key={brand.name} image={brand.image} label={brand.name} />
      ))}
    </ul>
  );
}
