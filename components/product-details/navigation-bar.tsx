import Link from "next/link";
import ArrowLeft from "@/components/product-details/svg/arrow-left";

export default function NavigationBar({
  productName,
}: {
  productName: string;
}) {
  return (
    <div className="w-full text-white flex gap-[8px] items-center px-[40px] py-[10px] ">
      <Link
        href="/products"
        className="text-navigation-bar-text hover:underline-none cursor-pointer text-product-nav-primary text-[16px] leading-[26px] font-[500]"
      >
        Products
      </Link>
      <ArrowLeft />
      <p className="text-product-nav-secondary text-[16px] leading-[26px] font-[500]">
        {productName}
      </p>
    </div>
  );
}
