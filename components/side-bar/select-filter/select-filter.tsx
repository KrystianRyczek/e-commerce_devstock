import SelectInput from "./select-input";
import FilterContainer from "../common-components/filter-container";
import { SelectFilterParams } from "@/util/types";
import ApplyFilterButton from "../common-components/apply-filter-button";

export default function SelectFilter({
  label,
  selectOptions,
  register,
  setValue,
  getValues,
}: SelectFilterParams) {
  return (
    <FilterContainer label={label}>
      <fieldset className="text-16-26-500 text-filter-text">
        <SelectInput
          label="All"
          fitertype={label}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        {selectOptions.map((option, index) => (
          <SelectInput
            key={option.name}
            label={option.name}
            index={index}
            fitertype={label}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        ))}
      </fieldset>
      <ApplyFilterButton />
    </FilterContainer>
  );
}
