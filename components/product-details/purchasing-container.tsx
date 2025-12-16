"use client";
import { useActionState, useState, useRef } from "react";
import SubmitButton from "./submit-button";
import ColorRadio from "./color-radio";

export default function PurchasingContainer({
  stock,
  variants,
  price,
}: {
  stock: number;
  variants: string[];
  price: number;
}) {
  const [order, setOrder] = useState({
    productId: null,
    quantity: null,
    color: null,
    unitprice: null,
  });
  const quantityRef = useRef<HTMLInputElement>(null);
  const subtotalRef = useRef<HTMLInputElement>(null);

  const addHandler = () => {
    if (quantityRef.current) {
      const currentValue = quantityRef.current.value
        ? +quantityRef.current.value
        : 0;
      if (currentValue < stock) {
        quantityRef.current.value = (currentValue + 1).toString();
        if (subtotalRef.current) {
          subtotalRef.current.value = ((currentValue + 1) * price).toString();
        }
      }
    }
  };
  const subtractHandler = () => {
    if (quantityRef.current) {
      const currentValue = quantityRef.current.value
        ? +quantityRef.current.value
        : 0;
      if (currentValue > 1) {
        quantityRef.current.value = (currentValue - 1).toString();
      }
      if (subtotalRef.current) {
        subtotalRef.current.value = ((currentValue - 1) * price).toString();
      }
    }
  };

  const addItemToCart = async (prevState: any, formData: FormData) => {
    const color = formData.get("color");
    console.log("Selected color:", color);
    const itemCount = formData.get("quantity");
    console.log("Selected quantity:", itemCount);

    let errors = [];

    return {};
  };

  const [formState, formAction] = useActionState(addItemToCart, {
    errors: [],
  });

  return (
    <form
      className="w-[423px] min-h-[430px] p-[24px] flex flex-col gap-[32px] rounded-[6px] border-[1px] border-purchasing-container-border bg-purchasing-container-background text-purchasing-container-h"
      action={formAction}
    >
      <fieldset className="flex flex-wrap gap-[16px]">
        <legend className="mb-[14px] text-[18px] font-[500] leading-[28px]">
          Color:
        </legend>
        {variants &&
          variants.map((variant: string, index: number) => (
            <ColorRadio
              key={variant + index}
              index={index}
              label="color"
              color={variant}
              checked={index === 0}
            />
          ))}
      </fieldset>
      <div className="w-[243px] flex flex-wrap gap-[14px]">
        <legend className="w-full text-[18px] font-[500] leading-[28px]">
          Quantity:
        </legend>
        <label
          htmlFor="quantity"
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
            className="w-1/2 flex justify-center text-center outline-none text-[24px] font-[500]"
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            max={stock}
            ref={quantityRef}
            defaultValue={1}
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
        <span className="ml-[16px] h-[54px] flex items-center text-[16px] font-[500] leading-[26px] text-purchasing-container-stock-text">
          Stock: {stock}
        </span>
      </div>
      <div className="w-full h-[40px] flex justify-between items-center">
        <legend className="text-[18px] font-[500] leading-[28px]">
          Subtotal:
        </legend>
        <label
          className="w-fit flex justify-end text-[28px] font-[500] leading-[40px] text-purchasing-container-price-input-text"
          htmlFor="subtotal"
        >
          <input
            className="flex text-end pr-[16px]"
            id="subtotal"
            name="subtotal"
            type="number"
            min={1}
            max={stock}
            ref={subtotalRef}
            defaultValue={price}
            disabled
          />
          <p>USD</p>
        </label>
      </div>
      <SubmitButton />
    </form>
  );
}
