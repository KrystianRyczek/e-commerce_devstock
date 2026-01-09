"use client";
import Badge from "@/components/product-details/svg/badge";
import { addDaysToDate, getRandomDateInNext7Days } from "@/util/random-date";
import { useState, useEffect } from "react";

const options: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
};

export default function ShippingDetailsContainer() {
  const [randomDate, setRandomDate] = useState<Date | null>(null);

  useEffect(() => {
    // Generate random date only on client side
    setRandomDate(getRandomDateInNext7Days());
  }, []);

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
          {!randomDate ? (
            <p className="text-16-26-400 text-product-description-text-secondary">
              Estimated arrival calculating...
            </p>
          ) : null}

          {randomDate && (
            <p className="text-16-26-400 text-product-description-text-secondary">
              Estimated arrival{" "}
              {randomDate.toLocaleDateString("en-GB", options)} -{" "}
              {addDaysToDate(randomDate, 3).toLocaleDateString(
                "en-GB",
                options
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
