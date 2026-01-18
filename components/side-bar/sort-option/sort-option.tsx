import FilterContainer from "@/components/side-bar/common-components/filter-container";
import SortOptionInput from "@/components/side-bar/sort-option/sort-option-input";
import { FilterFormData } from "@/util/types";
import { UseFormRegister } from "react-hook-form";
import { itemPerPageArray } from "@/util/static-data";
import { sortOptionArray } from "@/util/static-data";
import ApplyFilterButton from "../common-components/apply-filter-button";

export default function SortOption({
  register,
}: {
  register: UseFormRegister<FilterFormData>;
}) {
  return (
    <FilterContainer label="Sort & Display">
      <ul className="text-16-26-500 text-filter-text">
        <li className="py-1 flex flex-col gap-2">
          <p className="w-15">Show </p>
          <SortOptionInput
            label="Show"
            name="show"
            register={register}
            itemPerPageArray={itemPerPageArray}
          />
        </li>
        <li className="py-1 flex flex-col gap-2">
          <p className="w-15">Sort by </p>
          <SortOptionInput
            label="Sort by"
            name="sort"
            register={register}
            sortOptionArray={sortOptionArray}
          />
        </li>
      </ul>
      <ApplyFilterButton />
    </FilterContainer>
  );
}
