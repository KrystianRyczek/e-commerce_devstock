import { SubtotalContainerParams } from "@/util/types";

export default function SubtotalContainer({
  defaultValue,
  currency,
  register,
}: SubtotalContainerParams) {
  return (
    <div className="w-full h-[40px] flex justify-between items-center">
      <legend className="text-18-28-500">Subtotal:</legend>
      <label
        className="w-full flex justify-end text-28-40-500  text-purchasing-container-price-input-text"
        htmlFor="subtotal"
      >
        <input
          className="flex text-end pr-[16px] w-3/5"
          id="subtotal"
          type="number"
          defaultValue={defaultValue}
          disabled
          {...register("subtotal")}
        />
        <p>{currency}</p>
      </label>
    </div>
  );
}
