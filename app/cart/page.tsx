import type { StaticImageData } from "next/image";
import CartContainer from "@/components/cart/cart-container";
import NavigationBar from "@/components/cart/navigation-bar";

import monitor1 from "@/public/products-card/monitor1.png";
import maus1 from "@/public/products-card/maus1.png";
import kayboard1 from "@/public/products-card/kayboard1.png";

const cartProductsArray = [
  {
    id: 1,
    name: "Product 1",
    img: maus1,
    category: "Mouse",
    price: 29.99,
    quantity: 2,
    stock: 10,
    selected: true,
  },
  {
    id: 2,
    name: "Product 2",
    img: kayboard1,
    category: "Keyboard",
    price: 49.99,
    quantity: 1,
    stock: 5,
    selected: true,
  },
  {
    id: 3,
    name: "Product 3",
    img: monitor1,
    category: "Monitor",
    price: 199.99,
    quantity: 1,
    stock: 3,
    selected: true,
  },
];
export type CartProduct = {
  id: number;
  name: string;
  img: StaticImageData;
  category: string;
  price: number;
  quantity: number;
  stock: number;
  selected: boolean;
};

export default function CartPage() {
  return (
    <main className="flex flex-col w-full min-h-[612px] text-white p-[40px] max-tablet:p-[8px] max-desktop:p-[20px]">
      <NavigationBar />
      <CartContainer products={cartProductsArray} />
    </main>
  );
}
