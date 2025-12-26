import Image, { type StaticImageData } from "next/image";

type Card = {
  label: string;
  image: StaticImageData;
};
export default function Card({ image, label }: Card) {
  return (
    <li className="w-[220px] max-tablet:w-full max-desktop:w-[120px] h-[190px] max-tablet:h-[60px] max-desktop:h-[150px] p-[12px] rounded-[6px] bg-category-background border-[1px] border-category-border flex min-tablet:flex-col gap-[28px] max-desktop:gap-[18px] min-tablet:justify-center items-center">
      <div className="w-full max-tablet:w-1/4 h-[46px] relative flex justify-center text-category-text">
        <Image
          src={image}
          alt={`${label} brand iamge`}
          fill={true}
          className="object-contain"
        />
      </div>
      <h3 className="text-20-30-500 -tracking-[0.02rem]">{label}</h3>
    </li>
  );
}
