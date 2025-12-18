"use client";

import { useState } from "react";
import NavLinksList from "./nav-links-list";
import ShoppingCart from "./svg/shopping-cart";
import Avatar from "./svg/avatar";
import Setings from "./svg/setings";
import Hamburger from "./svg/hamburger";
import Close from "./svg/close";

export default function HamburgerMenu() {
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
          <ShoppingCart />
          <Avatar />
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
