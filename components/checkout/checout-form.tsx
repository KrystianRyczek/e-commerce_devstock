"use client";
import ShippingSelect from "./shipping/shipping-select";
import { useForm, useFieldArray } from "react-hook-form";
import type {
  CartProduct,
  PaymentMethod,
  ShippingMethod,
  UserAddress,
} from "@/app/cart/checkout/page";
import AddressContainer from "./address/address-container";
import ProductContainer from "./product/product-container";
import PaymentSelect from "./payment/payment-select";
import SummaryContainer from "./summary-container";

export type CheckoutFormData = {
  products: { [key: string]: string | number | boolean }[];
  address: { [key: string]: string | number }[];
  shipping: number;
  payment: number;
};

export default function CheckoutForm({
  cartProductsArray,
  userAddressArray,
  shippingMethodsArray,
  paymentMethodsArray,
}: {
  cartProductsArray: CartProduct[];
  userAddressArray: UserAddress[];
  shippingMethodsArray: ShippingMethod[];
  paymentMethodsArray: PaymentMethod[];
}) {
  const {
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: "onChange",
    defaultValues: {
      products: [],
      address: [],
      shipping: 1,
      payment: 1,
    },
  });
  const { remove, insert } = useFieldArray({ control, name: "address" });

  const onSubmit = handleSubmit((data): void => alert(JSON.stringify(data)));

  return (
    <div className="flex w-full">
      <form
        className="flex max-desktop:flex-col w-full justify-between gap-[30px] text-checkout-h"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-[40px] w-2/3 max-desktop:w-full">
          <ProductContainer
            productsArray={cartProductsArray}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />

          <AddressContainer
            userAddressArray={userAddressArray}
            register={register}
            setValue={setValue}
            remove={remove}
            insert={insert}
          />

          <ShippingSelect
            shippingMethodsArray={shippingMethodsArray}
            register={register}
            setValue={setValue}
          />

          <PaymentSelect
            paymentMethodsArray={paymentMethodsArray}
            register={register}
            setValue={setValue}
          />
        </div>
        <SummaryContainer watch={watch} />
      </form>
    </div>
  );
}
