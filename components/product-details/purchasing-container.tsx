"use client";
import Link from "next/link";
import { useActionState, useState, useRef } from "react";
import SubmitButton from "./submit-button";
import ColorRadio from "./color-radio";
import Badge from "./svg/badge";
import QuantityInput from "./quantity-input";

export default function PurchasingContainer({
  name,
  category,
  currency,
  price,
  stock,
  variants,
}: {
  name: string;
  category: string;
  currency: string;
  price: number;
  stock: number;
  variants: string[];
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

  const addItemToCart = async (
    prevState: { errors: string[] },
    formData: FormData
  ) => {
    const color = formData.get("color");
    console.log("Selected color:", color);
    const itemCount = formData.get("quantity");
    console.log("Selected quantity:", itemCount);

    const errors: string[] = [];

    return { errors };
  };

  const [formState, formAction] = useActionState(addItemToCart, {
    errors: [],
  });

  return (
    <div>
      <div className="flex flex-col gap-[20px] min-desktop:hidden mb-[24px]">
        <h2 className="text-28-40-500 ">{name}</h2>
        <div className="flex justify-between items-center pr-[10px]">
          <Link
            className="w-[66px] h-[36px] rounded-[6px] bg-product-description-button flex justify-center items-center"
            href={`/products/categorys=${category}`}
          >
            <span className="flex text-product-description-button-text text-14-24-500">
              {category}
            </span>
          </Link>
          <p className="text-32-44-500 ">
            {price} {currency}
          </p>
        </div>
      </div>
      <form
        className="w-[423px] max-desktop:w-full p-[24px] max-desktop:p-[16px] flex flex-col gap-[32px] max-desktop:gap-[20px] rounded-[6px] border-[1px] border-purchasing-container-border bg-purchasing-container-background text-purchasing-container-h"
        action={formAction}
      >
        <fieldset className="flex flex-wrap gap-[16px] max-desktop:gap-[9px]">
          <legend className="mb-[14px] max-desktop:mb-[8px] text-18-28-500">
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
        <div className="w-[243px] flex flex-wrap gap-[14px] max-desktop:gap-[8px]">
          <legend className="w-full text-18-28-500">Quantity:</legend>
          <QuantityInput
            name="quantity"
            stock={stock}
            quantityRef={quantityRef}
            subtractHandler={subtractHandler}
            addHandler={addHandler}
          />
          <span className="ml-[16px] h-[54px] flex items-center text-16-26-500 text-purchasing-container-stock-text">
            Stock: {stock}
          </span>
        </div>
        <div className="w-full h-[40px] flex justify-between items-center">
          <legend className="text-18-28-500">Subtotal:</legend>
          <label
            className="w-fit flex justify-end text-28-40-500  text-purchasing-container-price-input-text"
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
      <div className="desktop:hidden tablet:flex mobile:hidden flex-col gap-[20px] mt-[24px]">
        <div className="flex flex-col gap-[14px]">
          <p className="flex text-18-28-400 text-product-description-text-primary ">
            Shipping Available
          </p>
          <div className="w-[312px] max-desktop:w-full p-[16px] max-desktop:p-[10px] flex gap-[8px] border-[1px] border-product-description-border rounded-[6px]">
            <Badge />
            <div className="flex flex-col gap-[4px]">
              <p className="text-16-26-500">NexusHub Courier</p>
              <p className="text-16-26-400 text-product-description-text-secondary">
                Estimated arrival 30 Sep - 3 Oct
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
