import FilterContainer from "@/components/side-bar/common-components/filter-container";
import SortOptionInput from "@/components/side-bar/sort-option/sort-option-input";
const itemPerPageArray = [6, 9, 12, 15, 18];
const sortOptionArray = [
  "Default order",
  "Lowest Price",
  "Highest Price",
  "Name: A to Z",
  "Name: Z to A",
  "Newest Arrivals",
];
export default function SortOption() {
  return (
    <FilterContainer label="Sort & Display">
      <ul>
        <li className="py-1 flex flex-col gap-2">
          <p className="w-15">Show </p>
          <SortOptionInput label="Show" itemPerPageArray={itemPerPageArray} />
        </li>
        <li className="py-1 flex flex-col gap-2">
          <p className="w-15">Sort by </p>
          <SortOptionInput label="Sort by" sortOptionArray={sortOptionArray} />
        </li>
      </ul>
    </FilterContainer>
  );
}
