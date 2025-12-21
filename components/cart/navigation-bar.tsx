import Link from "next/link";
import ArrowLeft from "@/components/product-details/svg/arrow-left";

export default function NavigationBar() {
  return (
    <div className="flex w-full text-white gap-[8px] items-center ">
      <Link
        href="/"
        className="text-navigation-bar-text hover:underline-none cursor-pointer text-product-nav-primary text-[16px] leading-[26px] font-[500]"
      >
        Home
      </Link>
      <ArrowLeft />
      <p className="text-product-nav-secondary text-[16px] leading-[26px] font-[500]">
        Cart
      </p>
    </div>
  );
}
