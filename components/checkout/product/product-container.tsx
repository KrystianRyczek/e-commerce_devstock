import { CartProduct } from "@/app/cart/checkout/page";
import ProductCard from "@/components/checkout/product/product-card";
import { UseFormRegister, FieldValues } from "react-hook-form";

export default function ProductContainer({
  productsArray,
  register,
  setValue,
  getValues,
}: {
  productsArray: CartProduct[];
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: any) => void;
  getValues: (name: string) => any;
}) {
  return (
    <fieldset className="flex flex-col w-full ">
      <legend className="mb-[16px] text-checkout-h text-24-36-500 -tracking-[.02em]">
        Your Order
      </legend>
      <ul className="flex flex-col gap-[16px] mb-[24px]">
        {productsArray.map((product: CartProduct, index: number) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        ))}
      </ul>
    </fieldset>
  );
}
