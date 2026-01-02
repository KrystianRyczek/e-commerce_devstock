import ShippingDetailsContainer from "./common-components/shipping-details-container";
import ProductNameContainer from "./common-components/product-name-container";
import ProductDetailContainer from "./common-components/product-detail-container";
import ProductPriceContainer from "./common-components/product-price-container";
import { ProductDescriptionParams } from "@/util/types";

export default function ProductDescription({
  name,
  category,
  price,
  currency,
  description,
}: ProductDescriptionParams) {
  return (
    <div className="w-fit flex flex-col gap-[32px] text-product-description-h ">
      <ProductNameContainer name={name} category={category} />
      <ProductPriceContainer price={price} currency={currency} />
      <ProductDetailContainer description={description} />
      <ShippingDetailsContainer />
    </div>
  );
}
