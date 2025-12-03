import Image, { type StaticImageData } from "next/image";
type Slide = {
  category: string;
  description: string;
  image: StaticImageData;
};
export default function Slide({ category, description, image }: Slide) {
  return (
    <div className="overflow-hidden">
      <div>
        <h2 className="text-slide-show-h">{category}</h2>
        <p className="text-slide-show-text">{description}</p>
        <button className="flex w-[221px] h-[54px] border-1 ">
          <span className="flex text-slide-show-button">Explore Category</span>
          <svg className="flex w-6 h-4" viewBox="0 0 48 33">
            <path
              className="fill-slide-show-button stroke-0"
              d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"
            />
          </svg>
        </button>
      </div>
      <div className="w-[443px] h-[853px]  relative flex justify-center">
        <Image
          src={image}
          alt={`${category} category image`}
          fill={true}
          className="object-contain -rotate-35"
        />
      </div>
    </div>
  );
}
