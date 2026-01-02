import Link from "next/link";

export default function ProductDetailContainer({
  description,
}: {
  description: string;
}) {
  return (
    <div className="flex flex-col gap-[4px]">
      <p className="text-16-26-400 ">{description}</p>
      <Link href={`#`} className="text-16-26-500 text-product-description-link">
        View More
      </Link>
    </div>
  );
}
