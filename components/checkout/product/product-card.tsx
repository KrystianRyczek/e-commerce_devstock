import { CartProduct } from "@/app/cart/checkout/page";
import { UseFormRegister, FieldValues } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import QuantityInput from "./quantity-input";
import ProductCheckbox from "./product-checkbox";

export default function ProductCard({
  product,
  index,
  register,
  setValue,
  getValues,
}: {
  product: CartProduct;
  index: number;
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: any) => void;
  getValues: (name: string) => any;
}) {
  return (
    <li key={product.id} className="flex justify-between items-center">
      <label htmlFor={`${product.id}`} className="hidden">
        <input
          id={`${product.id}`}
          className="hidden"
          type="text"
          {...register(`products.${index}.id`)}
          defaultValue={product.id}
        />
      </label>
      <div className="flex flex-col gap-[24px] p-[24px] w-full min-h-[290px] bg-checkout-background border-[1px] border-checkout-border rounded-[6px]">
        <div className="flex w-full gap-[24px]">
          <div className="flex w-[172px] h-[138px] border-[1px] border-checkout-border rounded-[6px] ">
            <div className="flex relative w-[calc(100%-24px)] h-[calc(100%-24px)] m-auto">
              <Image src={product.img} alt={product.name} fill />
            </div>
          </div>
          <div className="flex flex-col w-[calc(100%-196px)] gap-[16px] h-full">
            <div className="flex flex-col w-full gap-[12px]">
              <h2 className="text-20-30-500">{product.name}</h2>
              <Link
                className="text-14-24-500 h-[36px] w-[100px] px-[10px] py-[6px] bg-checkout-button-background text-checkout-button-text rounded-[6px] text-center"
                href={`#`}
              >
                {product.category}
              </Link>
            </div>
            <div className="flex w-full justify-between">
              <label
                htmlFor={`price`}
                className="flex gap-[4px] justify-center items-center text-24-36-500 -tracking-[.02em]"
              >
                <p className="flex">$</p>
                <input
                  id={`price`}
                  className="flex w-[80px]"
                  type="text"
                  disabled
                  defaultValue={product.price}
                  {...register(`products.${index}.price`)}
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
                  stock={product.stock}
                  setValue={setValue}
                  getValues={getValues}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-checkout-border"></hr>
        <label className="flex gap-[16px]">
          <ProductCheckbox name="quantity" register={register} index={index} />

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
