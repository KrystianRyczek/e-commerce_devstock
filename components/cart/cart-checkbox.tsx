import { UseFormRegister } from "react-hook-form";
import { CartFormData } from "./cart-form";
import CheckMark from "./svg/check-mark";

export default function CartCheckbox({
  label,
  name,
  style,
  register,
  onClickHandler,
}: {
  label: string;
  name: string;
  style: string;
  register: UseFormRegister<CartFormData>;
  onClickHandler: () => void;
}) {
  return (
    <label htmlFor={label} className={style}>
      <div className="relative w-[26px] h-[26px]">
        <input
          className="peer h-full w-full cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border bg-login-checkbox-background border-login-checkbox-border checked:bg-login-checkbox-background-checked"
          type="checkbox"
          id={label}
          {...register(name)}
          onClick={onClickHandler}
        />
        <CheckMark />
      </div>
    </label>
  );
}
