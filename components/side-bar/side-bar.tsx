"use client";
import CategoryFilter from "@/components/side-bar/category-filter/category-filter";
import PriceFilter from "@/components/side-bar/price-filter/price-filter";
import SortOption from "@/components/side-bar/sort-option/sort-option";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Filter = {
  categorys: string[] | [];
  currentCurrency: { [key: string]: string };
  priceRange: { [key: string]: number | null };
};

export default function SideBar({
  currencys,
  categories,
}: {
  currencys: { name: string; rate: number }[];
  categories: string[];
}) {
  const [filter, setFilter] = useState<Filter>({
    categorys: [],
    currentCurrency: { min: "PLN", max: "PLN" },
    priceRange: { min: null, max: null },
  });
  const router = useRouter();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   const query = pathname.split("/product/")[1];
  //   if (query.includes("categorys=")) {
  //   }

  //   console.log("query", query);
  // }, []);

  const onChangeHandler = (): void => {
    const categorys: string[] = [];
    formRef.current
      ?.querySelectorAll("input[type=checkbox][data-id=category]:checked")
      .forEach((checkbox) => {
        categorys.push((checkbox as HTMLInputElement).value);
      });
    const minPriceInput = Number(
      formRef.current?.minPrice.value.replace(",", ".")
    )
      ? Number(formRef.current?.minPrice.value.replace(",", "."))
      : 0;
    const maxPriceInput = Number(
      formRef.current?.maxPrice.value.replace(",", ".")
    )
      ? Number(formRef.current?.maxPrice.value.replace(",", "."))
      : 0;
    setFilter({
      categorys,
      currentCurrency: {
        min: formRef.current?.minPriceCurrency.value,
        max: formRef.current?.maxPriceCurrency.value,
      },
      priceRange: {
        min: minPriceInput,
        max: maxPriceInput,
      },
    });
  };

  useEffect(() => {
    const currentRateMin =
      currencys.find((currency) => currency.name === filter.currentCurrency.min)
        ?.rate || 1;
    const currentRateMax =
      currencys.find((currency) => currency.name === filter.currentCurrency.max)
        ?.rate || 1;

    const categorysString =
      filter.categorys.length > 0
        ? "categorys=" +
          filter.categorys.map((category) => `${category}`).join("&")
        : "";
    const minPriceString =
      filter.priceRange.min != null && filter.priceRange.min > 0
        ? `${(filter.priceRange.min * currentRateMin).toFixed(2)}`
        : "";

    const maxPriceString = filter.priceRange.max
      ? `${(filter.priceRange.max * currentRateMax).toFixed(2)}`
      : "";

    const queryString: string =
      categorysString +
      (filter.priceRange.min ? `/min=${minPriceString}` : "") +
      (filter.priceRange.min && filter.priceRange.max
        ? `/max=${maxPriceString}`
        : filter.priceRange.max && filter.priceRange.max > 0
        ? `max=${maxPriceString}`
        : "");

    router.replace(`/products/${queryString}`);
  }, [filter]);

  const categoriesNotSelected =
    filter.categorys.length === 0 ||
    (filter.categorys.length === 1 && filter.categorys[0].includes("all"));

  return (
    <form
      ref={formRef}
      onChange={onChangeHandler}
      className="flex flex-col gap-4"
    >
      <SortOption />
      <CategoryFilter
        categories={categories}
        categoriesNotSelected={categoriesNotSelected}
      />
      <PriceFilter currentCurrency={filter.currentCurrency} />
    </form>
  );
}
