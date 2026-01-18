"use client";
import { useState } from "react";
import NavLinksList from "./nav-links-list";
import Hamburger from "./svg/hamburger";
import Close from "./svg/close";
import IconMenu from "./icon-menu";

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
        } p-10 absolute -top-3 -left-5 w-[320px] h-screen bg-foreground z-999`}
      >
        <div className="flex w-full h-10 justify-between mb-5">
          <button
            className="flex h-[30px] w-[30px] ml-auto text-hamburger-menu "
            onClick={clickOnHamburgerMenuHandler}
          >
            <Close />
          </button>
        </div>
        <IconMenu avatarUrl={avatarUrl} cartItemsCount={cartItemsCount} />
        <NavLinksList
          className="flex flex-col gap-2"
          clickOnHamburgerMenuHandler={clickOnHamburgerMenuHandler}
        />
      </div>
    </div>
  );
}
