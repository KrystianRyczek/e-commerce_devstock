import ToastContainerComponent from "../toast/toast-container";
import HamburgerMenu from "./hamburger-menu";
import NavLinksList from "./nav-links-list";
import IconMenu from "./icon-menu";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import {
  cartItemsCountBySessionCart,
  userAvatar,
  userItemsCartCount,
} from "@/util/fetching-data";

export default async function MainNavigation() {
  const session = await auth();
  let avatarUrl = null;
  let cartItemsCount = 0;

  if (session?.user) {
    avatarUrl = await userAvatar(Number(session.user.id));
    cartItemsCount = await userItemsCartCount(Number(session.user.id));
  } else {
    const cookieStore = await cookies();
    const sessionCartId = cookieStore.get("sessionCartId")?.value;
    if (sessionCartId) {
      cartItemsCount = await cartItemsCountBySessionCart(sessionCartId);
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
        <div className="flex max-tablet:hidden">
          <IconMenu avatarUrl={avatarUrl} cartItemsCount={cartItemsCount} />
        </div>
      </div>
      <NavLinksList className="w-full flex gap-[48px] max-tablet:hidden mt-[40px] max-desktop:mt-[20px]" />
      <hr className="text-line mt-[40px] max-desktop:mt-[20px] max-tablet:mt-[10px]"></hr>
      <ToastContainerComponent />
    </header>
  );
}
