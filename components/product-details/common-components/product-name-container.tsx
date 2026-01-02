import Link from "next/link";

export default function ProductNameContainer({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="text-28-40-500  text-product-description-h">{name}</h2>
      <Link
        className="w-[100px] h-[36px] rounded-[6px] bg-product-description-button flex justify-center items-center"
        href={`/products/categorys=${category.toLowerCase()}`}
      >
        <span className="flex text-product-description-button-text text-14-24-500">
          {category}
        </span>
      </Link>
    </div>
  );
}
