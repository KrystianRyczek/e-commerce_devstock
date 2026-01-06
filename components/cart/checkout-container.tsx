import Link from "next/link";

export default function CheckoutContainer({
  totalPrice,
  submitHandler,
}: {
  totalPrice: number;
  submitHandler: () => void;
}) {
  return (
    <div className="flex flex-col gap-[24px] w-[423px] max-desktop:w-full h-fit p-[24px] mb-[20px] rounded-[6px] bg-cart-checkout-background text-cart-checkout-h border-[1px] border-cart-checkout-border ">
      <div className="flex flex-col gap-[16px]">
        <p className="text-18-28-500">Total Product</p>
        <p className="flex justify-between text-16-26-500">
          Total Product Price (10 Items):{" "}
          <span className="text-18-28-500">${totalPrice}</span>
        </p>
      </div>
      <hr className="text-cart-checkout-border"></hr>
      <div className="flex flex-col gap-[32px]">
        <div className="flex justify-between">
          <p className="text-18-28-500">Subtotal</p>
          <p className="text-28-40-500 ">${totalPrice}</p>
        </div>
        <Link href="cart/checkout">
          <button
            type="button"
            onClick={submitHandler}
            className="w-full h-[54px] bg-cart-checkout-button-background text-cart-checkout-button-text text-16-26-500"
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
