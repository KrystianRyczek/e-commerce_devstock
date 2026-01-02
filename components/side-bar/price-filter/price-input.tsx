import CurrencySelect from "@/components/side-bar/price-filter/currency-select";
import { FilterFormData, PriceInputParams } from "@/util/types";

export default function PriceInput({
  curencyNameArray,
  currencyIcon,
  label,
  register,
  getValues,
  setValue,
}: PriceInputParams) {
  return (
    <div>
      <label
        htmlFor={`${label.toLocaleLowerCase()}Price`}
        className="block font-medium text-gray-900"
      />
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-filter-input-background pl-1 outline-1 -outline-offset-1 outline-filter-input-border has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-filter-input-border-focus">
          <label
            className="shrink-0 w-[30px]"
            htmlFor={`${label.toLocaleLowerCase()}icon`}
          >
            <input
              id={`${label.toLocaleLowerCase()}icon`}
              type="text"
              className="flex min-w-0 text-base text-filter-input-currency select-none"
              disabled
              {...register(
                `currencys.${label.toLocaleLowerCase()}CurrencyIcon` as keyof FilterFormData
              )}
            />
          </label>
          <label
            className="block min-w-0 grow"
            htmlFor={`${label.toLocaleLowerCase()}Price`}
          >
            <input
              id={`${label.toLocaleLowerCase()}Price`}
              type="text"
              placeholder={`${label} price`}
              className="py-1.5 pr-1 pl-1 text-base text-filter-input-text placeholder:text-filter-input-placeholder focus:outline-none"
              {...register(
                `price.${label.toLowerCase()}` as keyof FilterFormData,
                { pattern: /^[0-9]{1,}[.]?[,]?[0-9]*$/ }
              )}
            />
          </label>

          <CurrencySelect
            label={label}
            curencyNameArray={curencyNameArray}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        </div>
      </div>
    </div>
  );
}
