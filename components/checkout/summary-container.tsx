"use client";

import { CheckoutFormData } from "./checout-form";
import Cupon from "./svg/cupon";

const shippingCost = [
  { id: 1, cost: 5.99 },
  { id: 2, cost: 12.99 },
  { id: 3, cost: 24.99 },
];

export default function SummaryContainer({
  watch,
}: {
  watch: () => CheckoutFormData;
}) {
  const watchedValues = watch();
  console.log("Watched Values in SummaryContainer:", watchedValues);
  const quantity = watchedValues.products
    ? watchedValues.products.reduce(
        (total: number, product: { quantity?: number }) =>
          +(product.quantity || 0) + total,
        0
      )
    : 0;
  const price = watchedValues.products
    ? watchedValues.products.reduce(
        (total: number, product: { price?: number; quantity?: number }) =>
          +(product.price || 0) * +(product.quantity || 0) + total,
        0
      )
    : 0;
  const protection = watchedValues.products
    ? watchedValues.products.reduce(
        (total: number, product: { protection?: boolean; quantity?: number }) =>
          product.protection ? total + 1 * +(product.quantity || 0) : total,
        0
      )
    : 0;
  const shipping = shippingCost.find(
    (method) => method.id === +watchedValues.shipping
  )?.cost;
  return (
    <div className="flex flex-col gap-[24px] w-1/3 max-desktop:w-full h-fit mt-[52px] bg-summary-background border-[1px] border-summary-border p-[24px] rounded-[6px] min-desktop:sticky min-desktop:top-[50px]">
      <div className="flex flex-col gap-[8px] w-full mx-auto ">
        <button
          type="button"
          className="w-full h-[54px] border-[1px] rounded-[6px] border-summary-link text-summary-link text-16-26-500"
        >
          Apply Cupon
        </button>
        <p className=" text-center text-summary-text text-16-26-500">or</p>
        <label
          htmlFor="cupon"
          className="flex items-center w-full h-[54px] gap-[16px] border-[1px] border-summary-cupon-border text-summary-cupon-placeholder placeholder:text-summary-cupon-placeholder rounded-[6px] px-[20px] py-[16px]"
        >
          <div className="flex text-summary-cupon-placeholder">
            <Cupon />
          </div>

          <input
            className="text-16-26-500"
            id="cupon"
            name="cupon"
            type="text"
            placeholder="Enter cupon code"
          />
        </label>
      </div>
      <hr className="border-[1px] border-summary-border"></hr>
      <div className="flex flex-col gap-[16px] text-16-26-500 text-summary-text">
        <p className="text-18-28-500 text-summary-h">Total Product</p>
        <p className="flex w-full justify-between">
          Total Product Price ({quantity})<span>${price.toFixed(2)}</span>
        </p>
        <p className="flex w-full justify-between">
          Total Product Protection{" "}
          <span>${(protection * 3.55).toFixed(2)}</span>
        </p>
        <p className="flex w-full justify-between">
          Total Shipping Price <span>${shipping?.toFixed(2)}</span>
        </p>
        <p className="flex w-full justify-between">
          Shipping Insurance <span>${(protection * 2.67).toFixed(2)}</span>
        </p>
      </div>
      <hr className="border-[1px] border-summary-border"></hr>
      <div className="flex flex-col gap-[16px] text-16-26-500 text-summary-text">
        <p className="flex w-full justify-between text-18-28-500 text-summary-h">
          Transaction Fees
        </p>
        <p className="flex w-full justify-between">
          Service Fees <span>$0.5</span>
        </p>
      </div>
      <hr className="border-[1px] border-summary-border"></hr>
      <div className="flex flex-col gap-[32px]">
        <p className="flex w-full justify-between text-18-28-500 text-summary-h">
          Grand total{" "}
          <span className="text-28-40-500 text-summary-h">
            $
            {(
              price +
              protection * 3.55 +
              (shipping ?? 0) +
              protection * 2.67 +
              0.5
            ).toFixed(2)}
          </span>
        </p>
        <button
          type="submit"
          className="w-full h-[54px] bg-summary-button-background text-summary-button-text rounded-[6px]"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
