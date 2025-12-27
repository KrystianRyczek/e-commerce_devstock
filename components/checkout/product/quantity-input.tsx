import { useRef } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CheckoutFormData } from "../checout-form";
export default function QuantityInput({
  name,
  index,
  value,
  stock,
  register,
  setValue,
  getValues,
}: {
  name: string;
  index: number;
  value: number;
  stock: number;
  register: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  getValues: (name: string) => { [key: string]: string | number };
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const addHandler = () => {
    const currentValue = +getValues(`products.${index}.quantity`);

    if (currentValue < stock) {
      setValue(`products.${index}.quantity`, +currentValue + 1);
    }
  };
  const subtractHandler = () => {
    const currentValue = +getValues(`products.${index}.quantity`);

    if (currentValue > 1) {
      setValue(`products.${index}.quantity`, +currentValue - 1);
    }
  };
  return (
    <label
      htmlFor={name}
      className="flex w-[132px] h-[44px] rounded-[6px] border-[1px] border-checkout-border-quantity"
    >
      <button
        className="w-1/4 flex items-center justify-center text-[22px] pl-2"
        type="button"
        onClick={subtractHandler}
      >
        -
      </button>
      <input
        className="w-1/2 flex justify-center text-center outline-none text-14-24-500"
        id={name}
        type="number"
        min={1}
        max={stock}
        defaultValue={value}
        {...register(`products.${index}.quantity`)}
      />
      <button
        className="w-1/4 flex items-center justify-center text-[22px] pr-2"
        type="button"
        onClick={addHandler}
      >
        +
      </button>
    </label>
  );
}
