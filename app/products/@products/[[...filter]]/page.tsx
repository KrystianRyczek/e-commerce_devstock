import PaginationBar from "@/components/products/pagination-bar";
import ProductList from "@/components/products/product list";
import {
  categoriesNameList,
  brandsNameList,
  totalProductsCount,
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

  const count = await totalProductsCount(queryParams);
  const productsArray = (await products(queryParams)) || [];
  const maxPageNumber = Math.ceil(count / queryParams.show);
  console.log("Products Array:", !productsArray);
  return (
    <main className="w-full">
      {productsArray.length > 0 ? (
        <ProductList productsArray={productsArray} />
      ) : (
        <p className="text-18-28-500 text-center w-full mt-20">
          No products found matching the selected filters.
        </p>
      )}
      {maxPageNumber ? (
        <PaginationBar maxPageNnumber={maxPageNumber} page={queryParams.page} />
      ) : null}
    </main>
  );
}
