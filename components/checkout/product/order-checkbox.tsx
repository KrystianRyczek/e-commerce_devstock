import CheckMark from "./svg/check-mark";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormData } from "@/util/types";
import { v4 as uuidv4 } from "uuid";
export default function OrderCheckbox({
  name,
  value,
  orderIndex,
  register,
}: {
  name: string;
  value: number;
  orderIndex: number;
  register: UseFormRegister<CheckoutFormData>;
}) {
  const randomId = uuidv4();
  return (
    <label
      htmlFor={randomId + name}
      className="flex items-center cursor-pointer"
    >
      <div className="relative w-[26px] h-[26px]">
        <input
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-checkout-checkbox-background border-checkout-checkbox-border checked:bg-checkout-checkbox-background-checked"
          type="checkbox"
          id={randomId + name}
          value={value}
          {...register(`ordersId.${orderIndex}`)}
        />
        <CheckMark />
      </div>
    </label>
  );
}
