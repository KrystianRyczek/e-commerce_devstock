import CheckMark from "./svg/check-mark";
import { UseFormRegister } from "react-hook-form";
export default function ProductCheckbox({
  name,
  index,
  register,
}: {
  name: string;
  index: number;
  register: UseFormRegister<any>;
}) {
  return (
    <label htmlFor={name} className="flex items-center cursor-pointer">
      <div className="relative w-[26px] h-[26px]">
        <input
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-checkout-checkbox-background border-checkout-checkbox-border checked:bg-checkout-checkbox-background-checked"
          type="checkbox"
          id={name}
          {...register(`products.${index}.protection`)}
        />
        <CheckMark />
      </div>
    </label>
  );
}
