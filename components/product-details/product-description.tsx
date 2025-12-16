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
    <div className="w-[427px] h-[500px] flex flex-col gap-[32px] text-product-description-h">
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[28px] font-[500] leading-[40px]">{name}</h2>
        <Link
          className="w-[66px] h-[36px] rounded-[6px] bg-product-description-button flex justify-center items-center"
          href={`/products/categorys=${category}`}
        >
          <span className="flex text-product-description-button-text text-[14px] font-[500] leading-[24px]">
            {category}
          </span>
        </Link>
      </div>
      <p className="text-[32px] font-[500] leading-[44px]">
        {price} {currency}
      </p>
      <div className="flex flex-col gap-[4px]">
        <p className="text-[16px] font-[400] leading-[26px]">{description}</p>
        <Link
          href={``}
          className="text-[16px] font-[500] leading-[26px] text-product-description-link"
        >
          View More
        </Link>
      </div>
      <div className="flex flex-col gap-[14px]">
        <p className="text-[18px] font-[400] leading-[28px] text-product-description-text-primary ">
          Shipping Available
        </p>
        <div className="w-[312px] h-[88px] p-[16px] flex gap-[8px] border-[1px] border-product-description-border rounded-[6px]">
          <Badge />
          <div className="flex flex-col gap-[4px]">
            <p className="text-[16px] font-[500] leading-[26px]">
              NexusHub Courier
            </p>
            <p className="text-[16px] font-[400] leading-[26px] text-product-description-text-secondary">
              Estimated arrival 30 Sep - 3 Oct
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
