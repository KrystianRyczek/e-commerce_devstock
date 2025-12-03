import logitechG502Hero from "@/public/products/logitech-g502-hero.png";
import sonyWhCh510 from "@/public/products/sony-wh-ch510.png";
import aoc24g2e from "@/public/products/aoc-24g2g.png";
import razerHuntsmanElite from "@/public/products/razer-huntsman-elite.png";
import rogSwiftPg259qn from "@/public/products/rog-swift-pg259qn.png";

import Card from "./card";

const productsArray = [
  {
    name: "Logitech G502 Hero",
    image: logitechG502Hero,
    category: "Mouse",
    price: 54.99,
    promo: 34.99,
  },
  {
    name: "Sony WH-CH510",
    image: sonyWhCh510,
    category: "Headphone",
    price: 59.99,
    promo: false,
  },
  {
    name: "AOC 24G2E",
    image: aoc24g2e,
    category: "Monitor",
    price: 209.99,
    promo: false,
  },
  {
    name: "Razer Huntsman Elite",
    image: razerHuntsmanElite,
    category: "Keyboard",
    price: 106.83,
    promo: false,
  },
  {
    name: "ROG Swift PG259QN",
    image: rogSwiftPg259qn,
    category: "Monitor",
    price: 299.99,
    promo: false,
  },
];
export default function BrandList() {
  return (
    <ul className="flex w-[1628px] gap-[16px] items-center">
      {productsArray.map((product) => (
        <Card
          key={product.name}
          name={product.name}
          image={product.image}
          category={product.category}
          price={product.price}
          promo={product.promo}
        />
      ))}
    </ul>
  );
}
