"use client";
import ProductCard from "@/components/checkout/product/product-card";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CheckoutFormData, CheckoutCartProduct, Order } from "@/util/types";
import OrderCheckbox from "./order-checkbox";
export default function ProductContainer({
  userOrders,
  register,
  setValue,
  getValues,
}: {
  userOrders: Order[];
  register: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  getValues: (name: string) => { [key: string]: string | number };
}) {
  return (
    <fieldset className="flex flex-col w-full ">
      <legend className="mb-[16px] text-checkout-h text-24-36-500 -tracking-[.02em]">
        Your Order
      </legend>
      <ul className="flex flex-col gap-[36px] mb-[24px]">
        {userOrders.map((order: Order, orderIndex: number) => (
          <li key={order.id} className="flex flex-col justify-between">
            <div className="flex w-full justify-between mb-[20px]">
              <div className="flex items-center gap-[8px]">
                <OrderCheckbox
                  name={`ordersId.${orderIndex}`}
                  value={order.id}
                  register={register}
                  orderIndex={orderIndex}
                />
                <p>
                  Order {order.id} create at:{" "}
                  {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                </p>
              </div>
              <p>Payment status:{order.paymentStatus ? "Paid" : "Pending"}</p>
            </div>
            <ul>
              {order.orderedProducts.map(
                (product: CheckoutCartProduct, index: number) => (
                  <ProductCard
                    key={index}
                    orderId={order.id}
                    product={product}
                    index={index}
                    orderIndex={orderIndex}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                )
              )}
            </ul>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
