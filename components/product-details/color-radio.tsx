import ArrowDown from "@/components/product-details/svg/arrow-down";
export default function ColorRadio({
  index,
  label,
  color,
  checked,
}: {
  index: number;
  label: string;
  color: string;
  checked: boolean;
}) {
  return (
    <div className="flex relative w-[54px] h-[54px]">
      <input
        id={color + index}
        className={"peer hidden"}
        type="radio"
        name={label}
        value={color}
        defaultChecked={checked}
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
