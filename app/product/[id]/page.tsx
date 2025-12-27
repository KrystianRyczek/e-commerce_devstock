import { StaticImageData } from "next/image";
import NavigationBar from "@/components/product-details/navigation-bar";
import ProductDetails from "@/components/product-details/product-details";
import m1 from "@/public/product-images/m1.png";
import m2 from "@/public/product-images/m2.png";
import m3 from "@/public/product-images/m3.png";
import m4 from "@/public/product-images/m4.png";

const product = {
  name: "Rexus Xierra X16",
  category: "Mouse",
  imgs: [m1, m2, m3, m4, m4, m1, m2, m3],
  price: 100,
  promo: 34.99,
  currency: "USD",
  stock: 10,
  variants: ["#b0b0b0", "#4caf50", "#f29145", "#b0b0b0"],
  description:
    "The Xierra X16 mouse is a cutting-edge peripheral that combines precision and comfort. Its ergonomic design fits snugly in your hand, while its high-precision sensor ensures smooth and accurate ",
};
export type Product = {
  name: string;
  category: string;
  imgs: StaticImageData[];
  price: number;
  promo: number;
  currency: string;
  stock: number;
  variants: string[];
  description: string;
};

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const curentParams = await params;
  console.log(curentParams.id);

  return (
    <main>
      <NavigationBar productName={product.name} />
      <ProductDetails product={product} />
    </main>
  );
}
