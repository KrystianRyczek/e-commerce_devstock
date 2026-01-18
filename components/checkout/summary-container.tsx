"use client";

import { CheckoutFormData, Order, ShippingMethod } from "@/util/types";
import Cupon from "./svg/cupon";
import {
  protectionCost,
  serviceFees,
  shippingInsuranceCost,
} from "@/util/static-data";
import { UseFormWatch } from "react-hook-form";

export default function SummaryContainer({
  shippingMethodsArray,
  watch,
}: {
  shippingMethodsArray: ShippingMethod[];
  watch: UseFormWatch<CheckoutFormData>;
}) {
  const watchedValues: CheckoutFormData = watch();

  let quantity = 0;
  let price = 0;
  let protection = 0;

  watchedValues.orders.forEach((order: { [key: string]: any }) => {
    order.forEach(
      (product: { quantity: number; price: number; protection: boolean }) => {
        quantity += +product.quantity;
        price += +product.quantity * product.price;
        if (product.protection) {
          protection += +product.quantity * protectionCost;
        }
      }
    );
  });

  const shipping =
    shippingMethodsArray.find((method) => method.id === +watchedValues.shipping)
      ?.price || 0;
  const totlShippingPrice = shipping;
  const shippingInsurance = quantity * shippingInsuranceCost;
  const grandTotal =
    price + shippingInsurance + shipping + protection + serviceFees;

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
          Total Product Protection <span>${protection}</span>
        </p>
        <p className="flex w-full justify-between">
          Total Shipping Price <span>${totlShippingPrice?.toFixed(2)}</span>
        </p>
        <p className="flex w-full justify-between">
          Shipping Insurance <span>${shippingInsurance.toFixed(2)}</span>
        </p>
      </div>
      <hr className="border-[1px] border-summary-border"></hr>
      <div className="flex flex-col gap-[16px] text-16-26-500 text-summary-text">
        <p className="flex w-full justify-between text-18-28-500 text-summary-h">
          Transaction Fees
        </p>
        <p className="flex w-full justify-between">
          Service Fees <span>${serviceFees.toFixed(2)}</span>
        </p>
      </div>
      <hr className="border-[1px] border-summary-border"></hr>
      <div className="flex flex-col gap-[32px]">
        <p className="flex w-full justify-between text-18-28-500 text-summary-h">
          Grand total{" "}
          <span className="text-28-40-500 text-summary-h">
            ${grandTotal.toFixed(2)}
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
