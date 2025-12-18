import CheckMark from "./svg/check-mark";

export default function RegistrationCheckbox({
  label,
  register,
}: {
  label: string;
  register: any;
}) {
  return (
    <label htmlFor={label} className="flex items-center cursor-pointer">
      <div className="relative w-[26px] h-[26px]">
        <input
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-login-checkbox-background border-login-checkbox-border checked:bg-login-checkbox-background-checked"
          type="checkbox"
          id={label}
          name={label}
          {...register(label)}
        />
        <CheckMark />
      </div>
    </label>
  );
}
