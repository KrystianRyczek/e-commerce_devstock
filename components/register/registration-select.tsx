import ArrowDown from "./svg/arrow-down";
import type { FieldErrors } from "react-hook-form";
import type { FormValues } from "./registration-form";

export default function RegisterSelect({
  label,
  name,
  countryseArray,
  errors,
  register,
}: {
  label: string;
  name: keyof FormValues;
  countryseArray: string[];
  errors: FieldErrors<FormValues> | undefined;
  register: any;
}) {
  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-[16px] w-full text-register-h"
    >
      <p className="flex text-[18px] font-[500] leading-[28px]">{label}</p>
      <div className="h-[54px] grid shrink-0 grid-cols-1 focus-within:relative rounded-md utline-none">
        <select
          id={name}
          name={name}
          className={`col-start-1 row-start-1 w-full h-[54px] rounded-[6px] bg-register-background placeholder:text-register-placeholder text-register-text-primary border-[1px] ${
            errors?.[name]
              ? "border-register-input-border-error"
              : "border-register-border"
          } text-[16px] font-[400] leading-[26px] focus:outline-none  appearance-none px-3`}
          {...register(name)}
        >
          <option value={""}>Select a country</option>
          {countryseArray.map((country) => (
            <option key={country} id={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <ArrowDown />
      </div>
    </label>
  );
}
