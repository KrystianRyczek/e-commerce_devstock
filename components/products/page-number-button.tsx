"use client";
export default function PageNumberButton({
  active,
  pageNumber,
  pageNumberClickHandler,
}: {
  pageNumber: number;
  active: boolean;
  pageNumberClickHandler: (pageNumber: number) => void;
}) {
  return (
    <button
      onClick={() => {
        pageNumberClickHandler(pageNumber);
      }}
      className={`min-w-[44px] h-[44px] flex gap-[16px] justify-center items-center border-[1px] rounded-[6px] ${
        active
          ? "bg-pagination-button-page-background-active text-pagination-button-page-text-active"
          : "border-pagination-border bg-pagination-background text-pagination-button-page-text hover:cursor-pointer hover:bg-pagination-hover hover:text-pagination-hover-text"
      }`}
    >
      {pageNumber}
    </button>
  );
}
