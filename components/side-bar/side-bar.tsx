"use client";
import PriceFilter from "@/components/side-bar/price-filter/price-filter";
import SortOption from "@/components/side-bar/sort-option/sort-option";
import { useSearchParams, useRouter } from "next/navigation";
import SelectFilter from "@/components/side-bar/select-filter/select-filter";
import { useForm } from "react-hook-form";
import { FilterFormData, SideBarParams } from "@/util/types";
import { resolver } from "@/util/resolver";

export default function SideBar({
  brands,
  categories,
  currencys,
}: SideBarParams) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategories = searchParams.get("categories")
    ? JSON.parse(searchParams.get("categories") as string)
    : [];
  const selectedBrands = searchParams.get("brands")
    ? JSON.parse(searchParams.get("brands") as string)
    : [];

  const defaultValues: FilterFormData = {
    show: searchParams.get("show") === null ? 9 : +searchParams.get("show")!,
    sort: searchParams.get("sort")?.toString() || "Default order",
    category: categories.map((category) =>
      selectedCategories.includes(category.name.toLowerCase())
        ? category.name.toLowerCase()
        : false
    ),
    categoryAll: selectedCategories?.length > 0 ? false : true,
    brand: brands.map((brand) =>
      selectedBrands.includes(brand.name.toLowerCase())
        ? brand.name.toLowerCase()
        : false
    ),
    brandAll: selectedBrands.length > 0 ? false : true,
    price: {
      min: searchParams.get("min")
        ? parseFloat(searchParams.get("min")!)
        : null,
      max: searchParams.get("max")
        ? parseFloat(searchParams.get("max")!)
        : null,
    },
    currencys: {
      minCurrency: searchParams.get("currencyMin") || "PLN",
      minCurrencyIcon: searchParams.get("currencyMin") || "PLN",
      maxCurrency: searchParams.get("currencyMax") || "PLN",
      maxCurrencyIcon: searchParams.get("currencyMax") || "PLN",
    },
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FilterFormData>({
    mode: "all",
    defaultValues,
    resolver: resolver,
  });
  const submitHandler = async (data: FilterFormData) => {
    router.push(
      `./products?categories=${JSON.stringify(
        data.category.filter((item) => item !== false)
      )}&brands=${JSON.stringify(
        data.brand.filter((item) => item !== false)
      )}&min=${data.price.min ? data.price.min : 0}&max=${
        data.price.max ? data.price.max : 0
      }&currencyMin=${data.currencys.minCurrency}&currencyMax=${
        data.currencys.maxCurrency
      }&show=${data.show}&sort=${data.sort}`
    );
  };
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(submitHandler)}
    >
      <SortOption register={register} />
      <SelectFilter
        label="Category"
        selectOptions={categories}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
      <SelectFilter
        label="Brand"
        selectOptions={brands}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />
      <PriceFilter
        currentCurrency={currencys}
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
      />

      <button type="submit" className="btn-primary w-full mt-4 cursor-pointer">
        Apply Filters
      </button>
    </form>
  );
}
