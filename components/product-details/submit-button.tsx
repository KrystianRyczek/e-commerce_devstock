import ShoppingCart from "@/components/product-details/svg/shopping-cart";

export default function SubmitButton() {
  return (
    <button
      className="flex gap-[14px] justify-center items-center my-auto w-full h-[54px] border-[1px] rounded-[6px] border-purchasing-container-button-border text-purchasing-container-button-text hover:bg-purchasing-container-button-hover-background hover:text-purchasing-container-button-hover-text disabled:text-purchasing-container-button-text-disabled disabled:border-purchasing-container-button-border-disabled"
      type="submit"
    >
      <p className="text-center">Add to Cart</p>
      <ShoppingCart />
    </button>
  );
}
