import Avatar from "./avatar";
import ShoppingCart from "./shopping-cart";
import HamburgerMenu from "./hamburger-menu";
import NavLinksList from "./nav-links-list";
import Setings from "./Setings";

export default function MainNavigation() {
  return (
    <header className="w-full flex flex-col px-[40px] py-[16px]">
      <div className="w-full flex justify-between ">
        <HamburgerMenu />
        <h1 className="text-logoOrange font-semibold text-[36px] max-tablet:text-[26px] leading-[46px] tracking-[-0.02rem] ">
          Devstock
          <span className="text-logoNeutral">Hub</span>
        </h1>
        <div className="flex gap-5 h-[40px] max-tablet:hidden">
          <ShoppingCart />
          <Avatar />
          <Setings />
        </div>
      </div>
      <NavLinksList className="w-full flex gap-[48px] max-tablet:hidden mt-[40px] max-desktop:mt-[20px]" />
      <hr className="text-line mt-[40px] max-desktop:mt-[20px] max-tablet:mt-[10px]"></hr>
    </header>
  );
}
