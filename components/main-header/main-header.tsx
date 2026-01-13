import Link from "next/link";
import Avatar from "./svg/avatar";
import ShoppingCart from "./svg/shopping-cart";
import HamburgerMenu from "./hamburger-menu";
import NavLinksList from "./nav-links-list";
import Setings from "./svg/setings";
import ToastContainerComponent from "../toast/toast-container";
import { auth } from "@/auth";
import {
  cartItemsCountBySessionCart,
  userAvatar,
  userItemsCartCount,
} from "@/util/fetching-data";
import { cookies } from "next/headers";
import UserAvatar from "./user-avatar";
export default async function MainNavigation() {
  const session = await auth();
  let avatarUrl = null;
  let cartItemsCount = 0;

  if (session?.user) {
    console.log("SESSION USER:", session.user);
    avatarUrl = await userAvatar(Number(session.user.id));
    cartItemsCount = await userItemsCartCount(Number(session.user.id));
    console.log("CART ITEMS COUNT FOR USER:", cartItemsCount);
  } else {
    const cookieStore = await cookies();
    const sessionCartId = cookieStore.get("sessionCartId")?.value;
    if (sessionCartId) {
      cartItemsCount = await cartItemsCountBySessionCart(sessionCartId);
      console.log("CART ITEMS COUNT FOR GUEST:", cartItemsCount);
    }
  }

  return (
    <header className="w-full flex flex-col px-[40px] max-desktop:px-[20px] py-[16px]">
      <div className="w-full flex justify-between ">
        <HamburgerMenu avatarUrl={avatarUrl} cartItemsCount={cartItemsCount} />
        <h1 className="text-logoOrange font-semibold text-[36px] max-tablet:text-[26px] leading-[46px] tracking-[-0.02rem] ">
          Devstock
          <span className="text-logoNeutral">Hub</span>
        </h1>
        <div className="flex gap-5 h-[40px] max-tablet:hidden">
          <Link
            href="/cart"
            className="flex justify-center my-auto h-[24px] w-[25px]"
          >
            <div
              className={
                cartItemsCount > 0
                  ? "flex relative text-logoOrange"
                  : "flex text-logoNeutral"
              }
            >
              {cartItemsCount > 0 && (
                <span className="flex justify-center items-center absolute w-3 h-4 -top-2 right-1 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100">
                  *
                </span>
              )}
              <ShoppingCart />
            </div>
          </Link>
          <Link
            href="/profile"
            className="flex justify-center my-auto h-[24px] w-[25px]"
          >
            {avatarUrl !== null ? (
              <UserAvatar avatarUrl={avatarUrl.avatar} />
            ) : (
              <Avatar />
            )}
          </Link>
          <Setings />
        </div>
      </div>
      <NavLinksList className="w-full flex gap-[48px] max-tablet:hidden mt-[40px] max-desktop:mt-[20px]" />
      <hr className="text-line mt-[40px] max-desktop:mt-[20px] max-tablet:mt-[10px]"></hr>
      <ToastContainerComponent />
    </header>
  );
}
