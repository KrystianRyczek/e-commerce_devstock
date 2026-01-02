import { FilterFormData, CurrencySelectParams } from "@/util/types";

export default function CurrencySelect({
  label,
  curencyNameArray,
  register,
  getValues,
  setValue,
}: CurrencySelectParams) {
  const changeCurrencyHandler = () => {
    const currentCurrenty = getValues(
      `currencys.${label.toLocaleLowerCase()}Currency` as keyof FilterFormData
    );
    setValue(
      `currencys.${label.toLocaleLowerCase()}CurrencyIcon` as keyof FilterFormData,
      currentCurrenty
    );
  };
  return (
    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
      <select
        id={`${label.toLocaleLowerCase()}PriceCurrency`}
        aria-label="Currency"
        {...register(
          `currencys.${label.toLocaleLowerCase()}Currency` as keyof FilterFormData,
          { onChange: changeCurrencyHandler }
        )}
        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-1 text-base text-filter-input-currency placeholder:text-filter-input-currency focus:outline-none"
      >
        {curencyNameArray.map((currency) => (
          <option key={currency}>{currency}</option>
        ))}
      </select>
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        data-slot="icon"
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end"
      >
        <path
          className="fill-filter-input-currency"
          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}
