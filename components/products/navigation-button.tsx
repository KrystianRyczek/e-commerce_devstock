'use client";';
import Arrow from "./svg/arrow";

export default function NavigationButton({
  direction,
  clickHandler,
  disabled,
}: {
  direction: "previous" | "next";
  clickHandler: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={clickHandler}
      className={`w-[132px] h-[44px] flex gap-[16px] ${
        direction === "next" ? "" : "flex-row-reverse"
      } justify-center items-center border-[1px] rounded-[6px] cursor-pointer disabled:border-pagination-button-border-disabled disabled:text-pagination-button-text-disabled disabled:cursor-default`}
      disabled={disabled}
    >
      <span>{direction === "next" ? "Next" : "Previous"}</span>
      <Arrow
        styleText={`inline-block ${
          disabled
            ? "text-pagination-button-text-disabled"
            : "text-pagination-button-text"
        } ${direction === "next" ? "" : "rotate-180"}`}
      />
    </button>
  );
}
