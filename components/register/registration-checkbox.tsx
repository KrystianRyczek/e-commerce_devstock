import { FieldError, UseFormRegister } from "react-hook-form";
import CheckMark from "./svg/check-mark";
import { RegistationFormValuesProps } from "@/util/types";

export default function RegistrationCheckbox({
  label,
  register,
  error,
}: {
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<RegistationFormValuesProps>;
}) {
  return (
    <label htmlFor={label} className="flex items-center cursor-pointer">
      <div className="relative w-[26px] h-[26px]">
        <input
          className={`peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-login-checkbox-background border-login-checkbox-border checked:bg-login-checkbox-background-checked ${
            error ? "ring-3 ring-red-500" : ""
          }`}
          type="checkbox"
          id={label}
          {...register("conditionsAndPrivancy")}
        />
        <CheckMark />
      </div>
    </label>
  );
}
