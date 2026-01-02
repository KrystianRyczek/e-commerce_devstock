import ArrowDown from "@/components/product-details/svg/arrow-down";
import type { colorRadioParams } from "@/util/types";

export default function ColorRadio({
  index,
  label,
  color,
  checked,
  register,
}: colorRadioParams) {
  return (
    <div className="flex relative w-[54px] max-desktop:w-[28px] h-[54px] max-desktop:h-[28px]">
      <input
        id={color + index}
        className={"peer hidden"}
        type="radio"
        value={color}
        defaultChecked={checked}
        {...register("color")}
      />
      <label
        htmlFor={color + index}
        style={{ backgroundColor: color }}
        className="w-full h-full rounded-[6px] items-center justify-center cursor-pointer outline-offset-3 peer-checked:outline-2 peer-checked:outline-purchasing-container-color-input-border"
      />
      <ArrowDown />
    </div>
  );
}
