import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { CartFormData } from "./cart-form";

export default function CheckoutContainer({
  formData,
  isLoading,
  register,
}: {
  formData: CartFormData;
  isLoading: boolean;
  register: UseFormRegister<CartFormData>;
}) {
  return (
    <div className="flex flex-col gap-[24px] w-[423px] max-desktop:w-full h-fit p-[24px] mb-[20px] rounded-[6px] bg-cart-checkout-background text-cart-checkout-h border-[1px] border-cart-checkout-border ">
      <div className="flex flex-col gap-[16px]">
        <p className="text-18-28-500">Total Product</p>
        <ul>
          {formData.items.map(
            (
              item: {
                productId: number;
                quantity: number;
                price: number;
                name: string;
                selected: boolean;
              },
              index: number
            ) =>
              item.selected ? (
                <li key={index} className="flex justify-between">
                  <p>
                    {item.name} ({item.quantity} Items)
                  </p>
                  <p>{item.quantity * item.price} $</p>
                </li>
              ) : null
          )}
        </ul>
      </div>
      <hr className="text-cart-checkout-border"></hr>
      <div className="flex flex-col gap-[32px]">
        <div className="flex justify-between">
          <p className="text-18-28-500">Subtotal</p>
          <span className="flex gap-[5px] text-28-40-500">
            <input
              {...register("subtotal")}
              className="flex w-[170px] text-end"
              disabled
            />
            $
          </span>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full h-[54px] bg-cart-checkout-button-background text-cart-checkout-button-text text-16-26-500"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
