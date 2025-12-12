export default function SortOptionInput({
  label,
  itemPerPageArray,
  sortOptionArray,
}: {
  label: string;
  itemPerPageArray?: number[];
  sortOptionArray?: string[];
}) {
  return (
    <div className="grid shrink-0 grid-cols-1 focus-within:relative rounded-md bg-filter-input-background pl-1 outline-1 -outline-offset-1 outline-filter-input-border has-[select:focus-within]:outline-2 has-[select:focus-within]:outline-filter-input-border-focus">
      <select
        id={`${label} Select`}
        name={`${label} Select`}
        aria-label="Currency"
        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-1 text-base text-filter-input-currency focus:outline-none"
      >
        {itemPerPageArray && (
          <>
            {itemPerPageArray.map((itemPerPage) => (
              <option key={itemPerPage} id={`${label}Option${itemPerPage}`}>
                {itemPerPage}
              </option>
            ))}
          </>
        )}
        {sortOptionArray && (
          <>
            {sortOptionArray.map((sortOption) => (
              <option key={sortOption} id={`${label}Option${sortOption}`}>
                {sortOption}
              </option>
            ))}
          </>
        )}
      </select>
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        data-slot="icon"
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end"
      >
        <path
          className="fill-filter-input-currency"
          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}
