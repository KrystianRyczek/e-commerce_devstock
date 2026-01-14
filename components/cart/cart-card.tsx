import type { CartProduct } from "@/app/cart/page";
import CartCheckbox from "./cart-checkbox";
import Image from "next/image";
import DeleteCat from "./svg/delete-cart";
import Link from "next/link";
import QuantityInput from "./quantity-input";
import { useRef } from "react";
import { imageLoader } from "@/util/image-loader";
import { removeItemFromCartAction } from "@/util/server-action";
import Comment from "../checkout/comment";
import { CartFormData } from "./cart-form";
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormRegister,
} from "react-hook-form";
import { boolean, set } from "zod";
import { get } from "http";
import { fa } from "zod/locales";

export default function CartCard({
  product,
  index,
  register,
  setValue,
  getValues,
}: {
  product: CartProduct;
  index: number;
  register: UseFormRegister<CartFormData>;
  setValue: UseFormSetValue<CartFormData>;
  getValues: UseFormGetValues<CartFormData>;
}) {
  const quantityRef = useRef<HTMLInputElement | null>(null);

  const deleteHandler = () => {
    setValue(`items.[${index}].deleted`, true);
  };

  const checkBocxClikkHandler = () => {
    const currentValue = getValues();
    setValue(`items.[${index}].selected`, !currentValue.items[index].selected);
    const falseIndex = currentValue.items.findIndex(
      (item: { selected: boolean }) => item.selected === false
    );
    if (falseIndex === -1) {
      setValue("checkAll", true);
      return;
    }
    setValue("checkAll", false);
    setValue(
      "subtotal",
      currentValue.items.reduce(
        (
          price: number,
          item: { price: number; quantity: number; selected: boolean }
        ) => (item.selected ? price + item.price * item.quantity : price),
        0
      )
    );
    setValue(
      "totalItems",
      currentValue.items.reduce(
        (count: number, item: { quantity: number; selected: boolean }) =>
          item.selected ? count + item.quantity : count,
        0
      )
    );
  };
  const hidden = getValues(`items.[${index}].deleted`) ? true : false;

  return (
    <label
      className={`w-full flex items-center gap-[16px] relative ${
        hidden ? "hidden" : ""
      }`}
    >
      <input type="hidden" {...register(`items.[${index}].productId`)} />
      <input type="hidden" {...register(`items.[${index}].variantId`)} />
      <input type="hidden" {...register(`items.[${index}].price`)} />
      <CartCheckbox
        label={`select${product.productId + product.color}`}
        name={`items.[${index}].selected`}
        style="flex items-center cursor-pointer max-tablet:absolute max-tablet:top-[16px] max-tablet:right-[16px]"
        register={register}
        onClickHandler={checkBocxClikkHandler}
      />
      <div className=" flex max-tablet:flex-col w-full p-[24px] max-tablet:p-[10px] rounded-[6px] border-[1px] border-cart-border bg-cart-background gap-[32px]">
        <div className="flex flex-col relative w-[172px] h-[138px] p-[12px] border-[1px] border-cart-border rounded-[6px]">
          <div className="relative w-full h-full">
            <Image
              loader={(config) => imageLoader(config, "")}
              src={product.imgUrls.url}
              alt={product.name}
              fill
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-full ">
            <div className="flex justify-between w-full mb-[12px] ">
              <div className="flex flex-col w-full gap-[16px]">
                <p className="text-20-30-500">{product.name}</p>
                <p className="text-20-30-500 flex items-center gap-[8px]">
                  Color:{" "}
                  <span
                    style={{
                      backgroundColor: product.color,
                      borderRadius: "6px",
                    }}
                    className="h-6 w-6"
                  ></span>
                </p>
              </div>

              <DeleteCat onClick={deleteHandler} />
            </div>
            <Link
              href={`/products?category=["${product.category}"]`}
              className=" flex items-center justify-center mb-[16px] w-[80px] h-[36px] text-14-24-500 rounded-[6px] bg-cart-checkout-button-background text-cart-checkout-button-text"
            >
              {product.category}
            </Link>

            <div className="max-tablet:flex-col flex justify-between">
              <p className="text-24-36-500">${product.price}</p>
              <div className="flex flex-col gap-[16px]">
                <div className="flex gap-[24px] items-center max-tablet:justify-between ">
                  <Link
                    href="#"
                    className="text-[16px] font-[500] leading-[28px] text-cart-link"
                  >
                    Write note
                  </Link>
                  <div className="h-[24px] border-[1px] border-cart-border"></div>
                  <QuantityInput
                    key={`quantity${product.productId}${product.variantId}`}
                    name={`items.[${index}].quantity`}
                    stock={product.stock}
                    register={register}
                    getValues={getValues}
                    setValue={setValue}
                  />
                  <Comment
                    name={`items.[${index}].comment`}
                    register={register}
                  />
                </div>
                <p className="flex justify-end ">Stock: {product.stock}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}
