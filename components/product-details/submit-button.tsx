import ShoppingCart from "@/components/product-details/svg/shopping-cart";

export default function SubmitButton({ disabled }: { disabled?: boolean }) {
  return (
    <button
      className="flex gap-[14px] justify-center items-center my-auto w-full h-[54px] border-[1px] rounded-[6px] border-purchasing-container-button-border text-purchasing-container-button-text enabled:hover:bg-purchasing-container-button-hover-background enabled:hover:text-purchasing-container-button-hover-text disabled:text-purchasing-container-button-text-disabled disabled:border-purchasing-container-button-border-disabled"
      type="submit"
      disabled={disabled}
    >
      <p className="text-center">Add to Cart</p>
      <ShoppingCart />
    </button>
  );
}
