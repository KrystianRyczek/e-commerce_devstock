import BagIcon from "@/components/profile/svg/bag";
import DateParagraf from "./date";
import ProductList from "./product-list";

export default function OrderContainer({
  orderId,
  paymentStatus,
  createdAt,
  orderedProducts,
}: {
  orderId: number;
  paymentStatus: string | null;
  createdAt: Date;
  orderedProducts: { productName: string }[];
}) {
  return (
    <li className="flex gap-[14px] bg-profile-background mb-6 p-4 border border-profile-border rounded">
      <div className="text-profile-text-secondary">
        <BagIcon />
      </div>
      <div className="flex flex-col w-full gap-[14px]">
        <div className="flex max-desktop:flex-col text-profile-text justify-between">
          <DateParagraf createdAt={createdAt} />
          <p>
            Payment: <span className="uppercase">{paymentStatus}</span>
          </p>
        </div>
        <div>
          <h2 className="text-profile-h text-18-28-500">
            Your order no. {orderId}
          </h2>
          <ProductList orderedProducts={orderedProducts} />
        </div>
      </div>
    </li>
  );
}
