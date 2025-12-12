export default function CategoryInput({
  label,
  checked,
  dataId,
}: {
  label: string;
  checked?: boolean;
  dataId?: string;
}) {
  return (
    <label
      htmlFor={label.toLocaleLowerCase()}
      className="flex items-center cursor-pointer"
    >
      <div className="relative h-5 w-5">
        <input
          type="checkbox"
          value={label.toLocaleLowerCase()}
          id={label.toLocaleLowerCase()}
          name={label.toLocaleLowerCase()}
          checked={checked}
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-filter-checkbox-background border-filter-checkbox-border checked:bg-filter-checkbox-background-checked"
          data-id={dataId}
          {...(checked ? { readOnly: true } : {})}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex h-3.5 w-3.5 absolute text-filter-checkbox-checkmark opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      <span className="ml-2 text-filter-checkbox-text">{label}</span>
    </label>
  );
}
