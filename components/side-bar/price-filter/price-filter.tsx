import PriceInput from "@/components/side-bar/price-filter/price-input";
import FilterContainer from "@/components/side-bar/common-components/filter-container";
const currencys: { [key: string]: string }[] = [
  { name: "PLN", symbol: "PLN" },
  { name: "USD", symbol: "$" },
  { name: "EUR", symbol: "€" },
];

export default function PriceFilter({
  currentCurrency,
}: {
  currentCurrency: { [key: string]: string };
}) {
  const minCurrency =
    currencys.find((currency) => currency.name === currentCurrency.min)
      ?.symbol || "PLN";

  const maxCurrency =
    currencys.find((currency) => currency.name === currentCurrency.max)
      ?.symbol || "PLN";

  const curencyNameArray = currencys.map((currency) => currency.name);

  return (
    <FilterContainer label="Price">
      <ul className="text-16-26-500 text-filter-text">
        <li className="py-1">
          <PriceInput
            currencyIcon={minCurrency}
            label="Min"
            curencyNameArray={curencyNameArray}
          />
        </li>
        <li className="py-1">
          <PriceInput
            currencyIcon={maxCurrency}
            label="Max"
            curencyNameArray={curencyNameArray}
          />
        </li>
      </ul>
    </FilterContainer>
  );
}
