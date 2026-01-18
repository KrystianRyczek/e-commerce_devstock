"use client";
import { CheckoutCartProduct, CheckoutFormData } from "@/util/types";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import QuantityInput from "./quantity-input";
import ProductCheckbox from "./product-checkbox";
import { imageLoader } from "@/util/image-loader";
import { v4 as uuidv4 } from "uuid";

export default function ProductCard({
  orderId,
  product,
  index,
  orderIndex,
  register,
  setValue,
  getValues,
}: {
  orderId: number;
  product: CheckoutCartProduct;
  index: number;
  orderIndex: number;
  register: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  getValues: (name: string) => { [key: string]: string | number };
}) {
  const randomId = uuidv4();
  return (
    <li
      key={product.productId + product.variantId}
      className="flex justify-between items-center"
    >
      <input
        id={`${product.productId + product.variantId}`}
        type="hidden"
        {...register(`orders.${orderIndex}.${index}.orderId`)}
        defaultValue={orderId}
      />
      <input
        id={`${product.productId + product.variantId}`}
        type="hidden"
        {...register(`orders.${orderIndex}.${index}.productId`)}
        defaultValue={product.productId}
      />
      <input
        id={`${product.productId + product.variantId}`}
        type="hidden"
        {...register(`orders.${orderIndex}.${index}.variantId`)}
        defaultValue={product.variantId}
      />
      <input
        id={`${product.productId + product.variantId}`}
        type="hidden"
        {...register(`orders.${orderIndex}.${index}.comment`)}
        defaultValue={product.comment || ""}
      />
      <div className="flex flex-col gap-[24px] p-[24px] w-full min-h-[290px] bg-checkout-background border-[1px] border-checkout-border rounded-[6px]">
        <div className="flex w-full gap-[24px]">
          <div className="flex w-[172px] h-[138px] border-[1px] border-checkout-border rounded-[6px] ">
            <div className="flex relative w-[calc(100%-24px)] h-[calc(100%-24px)] m-auto">
              <Image
                loader={(config) => imageLoader(config, "")}
                src={product.img}
                alt={product.productName}
                fill
              />
            </div>
          </div>
          <div className="flex flex-col w-[calc(100%-196px)] gap-[16px] h-full">
            <div className="flex flex-col w-full gap-[12px]">
              <h2 className="text-20-30-500">{product.productName}</h2>
              <Link
                className="text-14-24-500 h-[36px] w-[100px] px-[10px] py-[6px] bg-checkout-button-background text-checkout-button-text rounded-[6px] text-center"
                href={`#`}
              >
                {product.category}
              </Link>
            </div>
            <div className="flex w-full justify-between">
              <label
                htmlFor={`${randomId}price`}
                className="flex gap-[4px] justify-center items-center text-24-36-500 -tracking-[.02em]"
              >
                <p className="flex">$</p>
                <input
                  id={`${randomId}price`}
                  className="flex w-[80px]"
                  type="text"
                  disabled
                  defaultValue={product.price}
                  {...register(`orders.${orderIndex}.${index}.price`)}
                />
              </label>
              <div className="flex gap-[12px] w-fit items-center justify-between">
                <Link
                  href={`#`}
                  className="w-fit text-nowrap text-16-26-500 text-checkout-link"
                >
                  Write note
                </Link>
                <div className="h-[24px] border-[1px] border-checkout-border-separator"></div>
                <QuantityInput
                  name="quantity"
                  value={product.quantity}
                  register={register}
                  index={index}
                  orderIndex={orderIndex}
                  stock={10}
                  setValue={setValue}
                  getValues={getValues}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-checkout-border"></hr>
        <label className="flex gap-[16px]">
          <ProductCheckbox
            name="protection"
            register={register}
            index={index}
            orderIndex={orderIndex}
          />

          <div className="flex flex-col gap-[5px] w-full">
            <div className="flex w-full justify-between">
              <p className="text-16-26-500">Product Protection</p>
              <p className="text-18-28-500">$1</p>
            </div>
            <p className="text-14-24-400 text-checkout-text-secondary">
              The claim process is easy and instant, valid for 6 months
            </p>
          </div>
        </label>
      </div>
    </li>
  );
}
