import PriceInput from "@/components/side-bar/price-filter/price-input";
import FilterContainer from "@/components/side-bar/common-components/filter-container";
import { PriceFilterParams } from "@/util/types";
import { currencys } from "@/util/static-data";
import ApplyFilterButton from "../common-components/apply-filter-button";

export default function PriceFilter({
  currentCurrency,
  errors,
  register,
  getValues,
  setValue,
}: PriceFilterParams) {
  return (
    <FilterContainer label="Price">
      <ul className="text-16-26-500 text-filter-text">
        <li className="py-1">
          <PriceInput
            currencyIcon={"currencys.minCurrency"}
            label="Min"
            curencyArray={currencys}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        </li>
        <li className="py-1">
          <PriceInput
            currencyIcon={"currencys.maxCurrency"}
            label="Max"
            curencyArray={currencys}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        </li>
      </ul>
      <div className="text-filter-error-text">
        {errors?.price?.min && <p>{errors.price.min.message}</p>}
        {errors?.price?.max && <p>{errors.price.max.message}</p>}
        {errors?.price?.message && <p>{errors.price.message}</p>}
      </div>
      <ApplyFilterButton />
    </FilterContainer>
  );
}
