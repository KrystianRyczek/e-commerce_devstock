import CheckMark from "../product/svg/check-mark";
import { UseFormRegister, FieldValues } from "react-hook-form";
export default function AddressCheckbox({
  name,
  index,
  register,
}: {
  name: string;
  index: number;
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <label
      htmlFor={name}
      className="flex gap-[16px] items-center cursor-pointer"
    >
      <div className="relative w-[26px] h-[26px]">
        <input
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-checkout-checkbox-background border-checkout-checkbox-border checked:bg-checkout-checkbox-background-checked"
          type="checkbox"
          id={name}
          {...register(`address.${index}.${name}`)}
        />
        <CheckMark />
      </div>
      <p className="text-16-26-500">Make it the main address</p>
    </label>
  );
}
