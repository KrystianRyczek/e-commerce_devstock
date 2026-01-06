import Link from "next/link";

export default function EmptyCartContainer() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] gap-[16px] text-cart-text">
      <h2 className="text-28-40-600">Your cart is empty</h2>
      <Link
        href="/products"
        className="text-16-24-400 text-cart-link text-center max-w-[400px]"
      >
        Start shopping now and discover amazing products to add to your cart!
      </Link>
    </div>
  );
}
