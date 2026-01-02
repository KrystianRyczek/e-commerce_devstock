import { FilterFormData, SelectInputParams } from "@/util/types";
import CheckMarkIcon from "../svg/check-mark";

export default function SelectInput({
  label,
  fitertype,
  index,
  register,
  setValue,
  getValues,
}: SelectInputParams) {
  const name: string =
    index !== undefined
      ? `${fitertype.toLowerCase()}[${index}]`
      : `${fitertype.toLowerCase()}${label}`;

  const selectAllHandler = () => {
    const selectAllValue = getValues(name as keyof FilterFormData);
    if (selectAllValue) {
      const currentOptionState = getValues(
        `${fitertype.toLowerCase()}` as "category" | "brand"
      );
      const newOptionState = currentOptionState.map(() => false);
      setValue(
        `${fitertype.toLowerCase()}` as "category" | "brand",
        newOptionState
      );
    }
    setValue(`${fitertype.toLowerCase()}All` as keyof FilterFormData, true);
  };
  const deselectAllHandler = () => {
    const currentState = getValues(
      `${fitertype.toLowerCase()}` as "category" | "brand"
    );
    const filterSelected = currentState.findIndex((item) => item !== false);
    if (filterSelected === -1) {
      setValue(`${fitertype.toLowerCase()}All` as keyof FilterFormData, true);
    } else {
      setValue(`${fitertype.toLowerCase()}All` as keyof FilterFormData, false);
    }
  };

  return (
    <label
      htmlFor={label.toLocaleLowerCase()}
      className="flex items-center cursor-pointer py-1"
    >
      <div className="relative h-5 w-5">
        <input
          type="checkbox"
          value={label.toLocaleLowerCase()}
          id={label.toLocaleLowerCase()}
          {...register(name as keyof FilterFormData, {
            onChange: label === "All" ? selectAllHandler : deselectAllHandler,
          })}
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-filter-checkbox-background border-filter-checkbox-border checked:bg-filter-checkbox-background-checked"
          data-id={`${fitertype}${label}`}
        />
        <CheckMarkIcon />
      </div>

      <span className="ml-2 text-filter-checkbox-text">{label}</span>
    </label>
  );
}
