"use client";

import { useState } from "react";
import NavLinksList from "./nav-links-list";
import ShoppingCart from "./shopping-cart";
import Avatar from "./avatar";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const clickOnHamburgerMenuHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="flex w-auto min-tablet:hidden relative">
      <button
        onClick={clickOnHamburgerMenuHandler}
        className="flex  h-[24px] w-[50px] my-auto"
      >
        <svg className="flex h-full w-full">
          <path
            className="stroke-hamburger-menu fill-hamburger-menu scale-x-150 scale-y-110 stroke-0"
            d="M19.357 11.667h-9.667c-0.92 0-1-0.745-1-1.667s0.080-1.667 1-1.667h9.667c0.92 0 1 0.745 1 1.667s-0.080 1.667-1 1.667zM22.69 3.333h-13c-0.92 0-1-0.745-1-1.667s0.080-1.667 1-1.667h13c0.92 0 1 0.745 1 1.667s-0.080 1.667-1 1.667zM9.69 16.667h13c0.92 0 1 0.745 1 1.667s-0.080 1.667-1 1.667h-13c-0.92 0-1-0.745-1-1.667s0.080-1.667 1-1.667zM4.357 11.667h-3c-0.92 0-1-0.745-1-1.667s0.080-1.667 1-1.667h3c0.92 0 1 0.745 1 1.667s-0.080 1.667-1 1.667zM4.357 3.333h-3c-0.92 0-1-0.745-1-1.667s0.080-1.667 1-1.667h3c0.92 0 1 0.745 1 1.667s-0.080 1.667-1 1.667zM4.357 20h-3c-0.92 0-1-0.745-1-1.667s0.080-1.667 1-1.667h3c0.92 0 1 0.745 1 1.667s-0.080 1.667-1 1.667z"
          />
        </svg>
      </button>
      <div
        className={`${
          isOpen ? "is-open" : "hidden"
        } p-10 absolute -top-3 -left-10 w-80 h-screen bg-foreground z-999`}
      >
        <div className="flex h-10 justify-between mb-5">
          <div className="flex w-40">
            <Avatar />
            <ShoppingCart />
          </div>
          <button
            className="flex h-[30px] w-[30px] ml-auto text-hamburger-menu "
            onClick={clickOnHamburgerMenuHandler}
          >
            <svg className="flex w-full h-full ml-auto">
              <path
                className="flex w-[26px] h-[26px] scale-150 mx-auto my-auto stroke-0 fill-hamburger-menu "
                d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"
              ></path>
            </svg>
          </button>
        </div>

        <NavLinksList
          className="flex flex-col gap-2"
          clickOnHamburgerMenuHandler={clickOnHamburgerMenuHandler}
        />
      </div>
    </div>
  );
}
