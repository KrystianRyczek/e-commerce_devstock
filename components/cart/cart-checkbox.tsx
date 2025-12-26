import CheckMark from "./svg/check-mark";

export default function CartCheckbox({
  label,
  checked,
  style,
  onChange,
}: {
  label: string;
  checked: boolean;
  style: string;
  onChange: () => void;
}) {
  return (
    <label htmlFor={label} className={style}>
      <div className="relative w-[26px] h-[26px]">
        <input
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-login-checkbox-background border-login-checkbox-border checked:bg-login-checkbox-background-checked"
          type="checkbox"
          id={label}
          name={label}
          checked={checked}
          onChange={onChange}
        />
        <CheckMark />
      </div>
    </label>
  );
}
