import Image, { type StaticImageData } from "next/image";

type Card = {
  label: string;
  image: StaticImageData;
};
export default function Card({ image, label }: Card) {
  return (
    <li className="w-[220px] max-desktop:w-[120px] h-[190px] max-desktop:h-[150px] p-[12px] rounded-[6px] bg-brand-background border-[1px] border-brand-border flex flex-col gap-[28px] max-desktop:gap-[18px] justify-center items-center">
      <div className="w-full h-[46px] relative flex justify-center object-contain">
        <Image
          src={image}
          alt={`${label} brand iamge`}
          fill={true}
          className="object-contain"
        />
      </div>
      <h3>{label}</h3>
    </li>
  );
}
