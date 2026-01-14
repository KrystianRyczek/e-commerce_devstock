import { CartFormData } from "./cart-form";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
export default function QuantityInput({
  name,
  stock,
  register,
  getValues,
  setValue,
}: {
  name: string;
  stock: number;
  register: UseFormRegister<CartFormData>;
  setValue: UseFormSetValue<CartFormData>;
  getValues: UseFormGetValues<CartFormData>;
}) {
  const subtractHandler = () => {
    const currentValue = getValues(name);
    if (currentValue > 1) {
      setValue(name, +currentValue - 1);
      const totalItems = getValues("totalItems");
      setValue("totalItems", totalItems - 1);
      const subtotal = Number(getValues("subtotal"));
      const itemPrice = Number(getValues(`items.${name.split(".")[1]}.price`));
      setValue("subtotal", Number((subtotal - itemPrice).toFixed(2)));
    }
  };
  const addHandler = () => {
    const currentValue = getValues(name);
    if (currentValue < stock) {
      setValue(name, +currentValue + 1);
      const totalItems = getValues("totalItems");
      setValue("totalItems", totalItems + 1);
      const subtotal = Number(getValues("subtotal"));
      const itemPrice = Number(getValues(`items.${name.split(".")[1]}.price`));
      setValue("subtotal", Number((subtotal + itemPrice).toFixed(2)));
    }
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <label
        htmlFor={name}
        className="flex w-[142px] h-[54px] rounded-[6px] border-[1px] border-purchasing-container-stock-border text-purchasing-container-stock-text "
      >
        <button
          className="w-1/4 text-[30px] pl-2"
          type="button"
          onClick={subtractHandler}
        >
          -
        </button>
        <input
          className="w-1/2 flex justify-center text-center outline-none text-24-36-500"
          id={name}
          {...register(name)}
          type="number"
          min={1}
          max={stock}
          disabled
        />
        <button
          className="w-1/4 text-[30px] pr-2"
          type="button"
          onClick={addHandler}
        >
          +
        </button>
      </label>
    </div>
  );
}
