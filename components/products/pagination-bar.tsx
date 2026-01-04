"use client";
import NavigationButton from "./navigation-button";
import PageNumberButton from "./page-number-button";

export default function PaginationBar({
  maxPageNnumber,
  page,
}: {
  maxPageNnumber: number;
  page: number;
}) {
  const pageNumberClickHandler = (pageNumber: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", pageNumber.toString());
    window.location.href = url.toString();
  };
  const navigationButtonClickHandler = (direction: "next" | "previous") => {
    const url = new URL(window.location.href);
    let newPageNumber = direction === "next" ? page + 1 : page - 1;
    if (newPageNumber < 1) newPageNumber = 1;
    if (newPageNumber > maxPageNnumber) newPageNumber = maxPageNnumber || 1;
    url.searchParams.set("page", newPageNumber.toString());
    window.location.href = url.toString();
  };
  return (
    <div className="flex max-desktop:flex-col gap-[16px] justify-between items-center w-full pt-[48px] pb-[68px]">
      <div className="flex gap-[8px]">
        <PageNumberButton
          pageNumber={page <= 3 ? 1 : page > 3 ? page - 2 : page}
          active={page === 1}
          pageNumberClickHandler={pageNumberClickHandler}
        />

        {maxPageNnumber > 1 && (
          <PageNumberButton
            pageNumber={page <= 3 ? 2 : page > 3 ? page - 1 : page}
            active={page === 2}
            pageNumberClickHandler={pageNumberClickHandler}
          />
        )}
        {maxPageNnumber > 2 && (
          <PageNumberButton
            pageNumber={
              page < 3
                ? 3
                : page > maxPageNnumber - 3
                ? maxPageNnumber - 3
                : page
            }
            active={page >= 3 && page <= maxPageNnumber - 3}
            pageNumberClickHandler={pageNumberClickHandler}
          />
        )}

        {maxPageNnumber >= 4 && (
          <span className="px-[12px] py-[8px] text-pagination-text">...</span>
        )}
        {maxPageNnumber >= 6 && (
          <PageNumberButton
            pageNumber={maxPageNnumber - 2}
            active={page === maxPageNnumber - 2}
            pageNumberClickHandler={pageNumberClickHandler}
          />
        )}
        {maxPageNnumber >= 5 && (
          <PageNumberButton
            pageNumber={maxPageNnumber - 1}
            active={page === maxPageNnumber - 1}
            pageNumberClickHandler={pageNumberClickHandler}
          />
        )}
        {maxPageNnumber >= 4 && (
          <PageNumberButton
            pageNumber={maxPageNnumber}
            active={page === maxPageNnumber}
            pageNumberClickHandler={pageNumberClickHandler}
          />
        )}
      </div>
      <div className="flex gap-[16px]">
        <NavigationButton
          direction="previous"
          clickHandler={() => navigationButtonClickHandler("previous")}
          disabled={page === 1}
        />
        <NavigationButton
          direction="next"
          clickHandler={() => navigationButtonClickHandler("next")}
          disabled={page === maxPageNnumber}
        />
      </div>
    </div>
  );
}
