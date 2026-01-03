import ProductList from "@/components/products/product list";
import {
  categoriesNameList,
  brandsNameList,
  products,
} from "@/util/fetching-data";
import type { ProductsPageProductCard, QueryParams } from "@/util/types";

export default async function Product({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const currentSearchParams = await searchParams;
  const categoriesArray = await categoriesNameList;
  const brandsArray = await brandsNameList;

  const queryParams: QueryParams = {
    ...(await searchParams),
    categories: currentSearchParams.categories
      ? JSON.parse(currentSearchParams.categories)
      : categoriesArray.map((category) => category.name.toLowerCase()),
    brands: currentSearchParams.brands
      ? JSON.parse(currentSearchParams.brands)
      : brandsArray.map((brand) => brand.name.toLowerCase()),
    min: currentSearchParams.min ? Number(currentSearchParams.min) : 0,
    max: currentSearchParams.max
      ? Number(currentSearchParams.max)
      : 1 * 1000 * 1000,
    show: currentSearchParams.show ? Number(currentSearchParams.show) : 9,
    page: currentSearchParams.page ? Number(currentSearchParams.page) : 1,
    sort: currentSearchParams.sort ? currentSearchParams.sort : "Default order",
  };
  console.log("Search Params:", queryParams);

  const productsArray = await products(queryParams);
  console.log(productsArray);
  return (
    <main className="w-full">
      <ProductList productsArray={productsArray} />
    </main>
  );
}
