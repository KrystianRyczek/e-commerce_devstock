import Image, { StaticImageData } from "next/image";

export default function SelectContainer({
  openModal,
  register,
  img,
  label,
}: {
  openModal: () => void;
  register: (name: string) => any;
  img: StaticImageData;
  label: string;
}) {
  return (
    <label className="flex w-full h-[76px] p-[14px] rounded-[6px] bg-checkout-background border-[1px] border-checkout-border text-checkout-h cursor-pointer">
      <button
        className="flex gap-[20px] w-full h-full items-center"
        type="button"
        onClick={openModal}
      >
        <div className="flex relative object-contain w-[calc(76px-28px)] h-[calc(76px-28px)]">
          <Image src={img} alt={label} fill className="object-contain" />
        </div>
        <p className="flex text-18-28-500">{label}</p>
      </button>
      <input
        className="hidden"
        type="text"
        name="shipping"
        {...register("shipping")}
      />
    </label>
  );
}
