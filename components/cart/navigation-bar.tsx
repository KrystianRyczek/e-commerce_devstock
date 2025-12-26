import Link from "next/link";
import ArrowLeft from "@/components/product-details/svg/arrow-left";

export default function NavigationBar() {
  return (
    <div className="flex w-full gap-[8px] items-center text-bar-nav-secondary">
      <Link
        href="/"
        className=" hover:underline-none cursor-pointer text-16-26-500"
      >
        Home
      </Link>
      <ArrowLeft />
      <p className="text-bar-nav-primary text-16-26-500 ">Cart</p>
    </div>
  );
}
