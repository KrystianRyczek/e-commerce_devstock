"use client";

import { useState } from "react";
import NavLinksList from "./nav-links-list";
import ShoppingCart from "./svg/shopping-cart";
import Avatar from "./svg/avatar";
import Setings from "./svg/setings";
import Hamburger from "./svg/hamburger";
import Close from "./svg/close";
import UserAvatar from "./user-avatar";

export default function HamburgerMenu({
  avatarUrl,
  cartItemsCount,
}: {
  avatarUrl: { avatar: string } | null;
  cartItemsCount: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const clickOnHamburgerMenuHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="flex w-auto min-tablet:hidden relative">
      <button
        onClick={clickOnHamburgerMenuHandler}
        className="flex  h-[24px] w-[50px] my-auto"
      >
        <Hamburger />
      </button>
      <div
        className={`${
          isOpen ? "is-open" : "hidden"
        } p-10 absolute -top-3 -left-10 w-80 h-screen bg-foreground z-999`}
      >
        <div className="flex w-full h-10 justify-between mb-5">
          <button
            className="flex h-[30px] w-[30px] ml-auto text-hamburger-menu "
            onClick={clickOnHamburgerMenuHandler}
          >
            <Close />
          </button>
        </div>
        <div className="flex w-full justify-between mb-5">
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
          {avatarUrl !== null ? (
            <UserAvatar avatarUrl={avatarUrl.avatar} />
          ) : (
            <Avatar />
          )}
          <Setings />
        </div>
        <NavLinksList
          className="flex flex-col gap-2"
          clickOnHamburgerMenuHandler={clickOnHamburgerMenuHandler}
        />
      </div>
    </div>
  );
}
