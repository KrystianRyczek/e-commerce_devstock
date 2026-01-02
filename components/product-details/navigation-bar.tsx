import Link from "next/link";
import ArrowLeft from "@/components/product-details/svg/arrow-left";

export default function NavigationBar({
  productName,
}: {
  productName: string | undefined;
}) {
  return (
    <div className="w-full flex text-bar-nav-secondary gap-[8px] items-center px-[40px] max-desktop:px-[20px] py-[10px] max-desktop:py-[8px] text-16-26-500">
      <Link
        href="/products"
        className="hover:underline-none cursor-pointer text-bar-nav-primary"
      >
        Products
      </Link>
      <ArrowLeft />
      {productName && <p>{productName}</p>}
    </div>
  );
}
