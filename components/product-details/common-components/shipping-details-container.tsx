import Badge from "@/components/product-details/svg/badge";

export default function ShippingDetailsContainer() {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="text-18-28-400 text-product-description-text-primary ">
        Shipping Available
      </p>
      <div className="w-fit text-nowrap h-[88px] p-[16px] flex  gap-[8px] border-[1px] border-product-description-border rounded-[6px]">
        <Badge />
        <div className="flex flex-col gap-[4px]">
          <p className="text-16-26-500 text-product-description-h">
            NexusHub Courier
          </p>
          <p className="text-16-26-400 text-product-description-text-secondary">
            Estimated arrival 30 Sep - 3 Oct
          </p>
        </div>
      </div>
    </div>
  );
}
