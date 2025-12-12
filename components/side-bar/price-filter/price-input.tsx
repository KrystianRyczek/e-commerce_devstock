import CurrencySelect from "@/components/side-bar/price-filter/currency-select";

export default function PriceInput({
  curencyNameArray,
  currencyIcon,
  label,
}: {
  curencyNameArray: string[];
  currencyIcon: string;
  label: string;
}) {
  return (
    <div>
      <label
        htmlFor={`${label.toLocaleLowerCase()}Price`}
        className="block font-medium text-gray-900"
      />
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-filter-input-background pl-1 outline-1 -outline-offset-1 outline-filter-input-border has-[input:focus-within]:outline-2 has-[input:focus-within]:outline-filter-input-border-focus">
          <div className="shrink-0 text-base text-filter-input-currency select-none">
            {currencyIcon}
          </div>
          <input
            id={`${label.toLocaleLowerCase()}Price`}
            type="text"
            name={`${label.toLocaleLowerCase()}Price`}
            placeholder={`${label} price`}
            className="block min-w-0 grow py-1.5 pr-1 pl-1 text-base text-filter-input-text placeholder:text-filter-input-placeholder focus:outline-none"
          />
          <CurrencySelect label={label} curencyNameArray={curencyNameArray} />
        </div>
      </div>
    </div>
  );
}
