import monitor1 from "@/public/products-card/monitor1.png";
import monitor2 from "@/public/products-card/monitor2.png";
import maus1 from "@/public/products-card/maus1.png";
import maus2 from "@/public/products-card/maus2.png";
import headphone1 from "@/public/products-card/headphone1.png";
import headphone2 from "@/public/products-card/headphone2.png";
import kayboard1 from "@/public/products-card/kayboard1.png";
import kayboard2 from "@/public/products-card/keyboard2.png";

//-----------------------------------------------------------------------

import ProductList from "@/components/products/product list";
//-----------------------------------------------------------------------
const productsArray = [
  {
    id: 1,
    category: "Mouse",
    name: "Mouse1",
    image: [maus1],
    price: 10.11,
    stock: 10,
    currency: "USD",
  },
  {
    id: 2,
    category: "Monitor",
    name: "Monitor1",
    image: [monitor1],
    price: 100.12,
    stock: 10,
    currency: "USD",
  },
  {
    id: 3,
    category: "Headphone",
    name: "Headphone1",
    image: [headphone1],
    price: 125.47,
    stock: 10,
    currency: "USD",
  },
  {
    id: 4,
    category: "Mouse",
    name: "Mouse2",
    image: [maus2],
    price: 12.34,
    stock: 10,
    currency: "USD",
  },
  {
    id: 5,
    category: "Keyboard",
    name: "Keyboard2",
    image: [kayboard2],
    price: 82.99,
    stock: 10,
    currency: "USD",
  },
  {
    id: 6,
    category: "Mouse",
    name: "Mouse3",
    image: [maus1],
    price: 54.23,
    stock: 10,
    currency: "USD",
  },
  {
    id: 7,
    category: "Monitor",
    name: "Monitor3",
    image: [monitor2],
    price: 150.0,
    stock: 10,
    currency: "USD",
  },
  {
    id: 8,
    category: "Mouse",
    name: "Mouse4",
    image: [maus1],
    price: 100,
    stock: 10,
    currency: "USD",
  },
  {
    id: 9,
    category: "Keyboard",
    name: "Keyboard5",
    image: [kayboard1],
    price: 82.99,
    stock: 10,
    currency: "USD",
  },
];

export default async function Product({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const currentSearchParams = await searchParams;

  const queryParams: { [key: string]: string | string[] | number | null } = {
    ...(await searchParams),
    categories: currentSearchParams.categories
      ? JSON.parse(currentSearchParams.categories)
      : [],
    brands: currentSearchParams.brands
      ? JSON.parse(currentSearchParams.brands)
      : [],
    min: currentSearchParams.min ? Number(currentSearchParams.min) : null,
    max: currentSearchParams.max ? Number(currentSearchParams.max) : null,
    show: currentSearchParams.show ? Number(currentSearchParams.show) : null,
    page: currentSearchParams.page ? Number(currentSearchParams.page) : null,
  };

  console.log("Search Params:", queryParams);
  return (
    <main className="w-full">
      <ProductList productsArray={productsArray} />
    </main>
  );
}
