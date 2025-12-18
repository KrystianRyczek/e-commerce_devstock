import CheckMark from "./svg/check-mark";

export default function LoginCheckbox({
  label,
  dataId,
}: {
  label: string;
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
          value={"yes"}
          id={label.toLocaleLowerCase().replace(" ", "")}
          name={label.toLocaleLowerCase().replace(" ", "")}
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-login-checkbox-background border-login-checkbox-border checked:bg-login-checkbox-background-checked"
          data-id={dataId}
        />
      </div>
      <CheckMark />
      <span className="ml-2 text-login-text-secondary">{label}</span>
    </label>
  );
}
