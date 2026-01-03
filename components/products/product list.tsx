import ProductCard from "@/components/products/product-card";
import type { ProductsPageProductCard } from "@/util/types";

export default function ProductList({
  productsArray,
}: {
  productsArray: ProductsPageProductCard[];
}) {
  return (
    <ul className="flex flex-wrap w-full gap-y-[32px] max-desktop:gap-y-[16px]  gap-x-[48px] max-desktop:gap-x-[24px]">
      {productsArray.map((product) => (
        <li
          key={product.id}
          className="w-[calc((100%-(2*48px))/3)] max-desktop:w-[calc((100%-24px)/2)] max-tablet:w-full"
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
