import Link from "next/link";
import Badge from "./svg/badge";

export default function ProductDescription({
  name,
  category,
  price,
  currency,
  description,
}: {
  name: string;
  category: string;
  price: number;
  currency: string;
  description: string;
}) {
  return (
    <div className="w-[427px] max-tablet:w-full flex flex-col gap-[32px] text-product-description-h ">
      <div className="flex flex-col gap-[20px] max-desktop:hidden">
        <h2 className="text-28-40-500 ">{name}</h2>
        <Link
          className="w-[66px] h-[36px] rounded-[6px] bg-product-description-button flex justify-center items-center"
          href={`/products/categorys=${category}`}
        >
          <span className="flex text-product-description-button-text text-14-24-500">
            {category}
          </span>
        </Link>
      </div>
      <p className="text-32-44-500  max-desktop:hidden ">
        {price} {currency}
      </p>
      <div className="flex flex-col gap-[4px]">
        <p className="text-16-26-400 ">{description}</p>
        <Link
          href={``}
          className="text-16-26-500 text-product-description-link"
        >
          View More
        </Link>
      </div>
      <div className="mobile:flex tablet:hidden desktop:flex flex-col gap-[14px]">
        <p className="text-18-28-400 text-product-description-text-primary ">
          Shipping Available
        </p>
        <div className="w-[312px] max-tablet:w-full h-[88px] p-[16px] flex  gap-[8px] border-[1px] border-product-description-border rounded-[6px]">
          <Badge />
          <div className="flex flex-col gap-[4px]">
            <p className="text-16-26-500">NexusHub Courier</p>
            <p className="text-16-26-400 text-product-description-text-secondary">
              Estimated arrival 30 Sep - 3 Oct
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
