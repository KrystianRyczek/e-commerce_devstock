"use client";
import type {
  Order,
  PaymentMethod,
  ShippingMethod,
  UserAddress,
  CheckoutFormData,
} from "@/util/types";
import ShippingSelect from "./shipping/shipping-select";
import AddressContainer from "./address/address-container";
import ProductContainer from "./product/product-container";
import PaymentSelect from "./payment/payment-select";
import SummaryContainer from "./summary-container";
import { useForm, useFieldArray } from "react-hook-form";
import { submitOrderAction } from "@/util/server-action";

export default function CheckoutForm({
  userOrders,
  userAddressArray,
  shippingMethodsArray,
  paymentMethodsArray,
}: {
  userOrders: Order[];
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
      ordersId: userOrders.map((order) => String(order.id)),
      orders: [],
      address: [],
      shipping: shippingMethodsArray[0]?.id || 1,
      payment: paymentMethodsArray[0]?.id || 1,
    },
  });

  const { remove, insert } = useFieldArray({ control, name: "address" });

  const onSubmit = handleSubmit((data: CheckoutFormData): void => {
    submitOrderAction(data);
  });

  return (
    <div className="flex w-full">
      <form
        className="flex max-desktop:flex-col w-full justify-between gap-[30px] text-checkout-h"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-[40px] w-2/3 max-desktop:w-full">
          <ProductContainer
            userOrders={userOrders}
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
        <SummaryContainer
          watch={watch}
          shippingMethodsArray={shippingMethodsArray}
        />
      </form>
    </div>
  );
}
