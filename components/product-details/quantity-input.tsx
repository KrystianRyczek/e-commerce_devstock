"use client";
import { QuantityInputParams } from "@/util/types";

export default function QuantityInput({
  price,
  stock,
  register,
  setValue,
  getValues,
}: QuantityInputParams) {
  const decreaseHandler = () => {
    const currentQuantity = getValues("quantity");
    if (+currentQuantity > 1) {
      setValue("quantity", +currentQuantity - 1);
      setValue("subtotal", +((+currentQuantity - 1) * price).toFixed(2));
    }
  };
  const increaseHandler = () => {
    const currentQuantity = getValues("quantity");
    if (+currentQuantity < stock) {
      setValue("quantity", +currentQuantity + 1);
      setValue("subtotal", +((+currentQuantity + 1) * price).toFixed(2));
    }
  };
  return (
    <label
      htmlFor="quantity"
      className="flex w-[142px] h-[54px] rounded-[6px] border-[1px] border-purchasing-container-stock-border text-purchasing-container-stock-text "
    >
      <button
        className="w-1/4 text-[30px] pl-2"
        type="button"
        onClick={decreaseHandler}
      >
        -
      </button>
      <input
        className="w-1/2 flex justify-center text-center outline-none text-[24px] font-[500]"
        id="quantity"
        type="number"
        min={stock > 0 ? 1 : 0}
        max={stock}
        defaultValue={stock > 0 ? 1 : 0}
        disabled
        {...register(`quantity`)}
      />
      <button
        className="w-1/4 text-[30px] pr-2"
        type="button"
        onClick={increaseHandler}
      >
        +
      </button>
    </label>
  );
}
