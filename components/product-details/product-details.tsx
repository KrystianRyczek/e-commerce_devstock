import SlideShow from "@/components/product-details/slide-show";
import PurchasingContainer from "@/components/product-details/purchasing-container";
import type { ProductCard } from "@/util/types";
import ProductDetailContainer from "./common-components/product-detail-container";
import ShippingDetailsContainer from "./common-components/shipping-details-container";

export default function ProductDetails({ product }: { product: ProductCard }) {
  return (
    <div className="w-full text-white flex max-tablet:flex-col gap-[32px] max-desktop:gap-[18px] items-start p-[40px] max-desktop:px-[8px] ">
      <div className="flex w-[422px] max-tablet:w-full max-desktop:flex-col gap-[40px]">
        <div className="w-full h-[472px] max-tablet:h-[380px] relative">
          <SlideShow imagesArray={product.imgUrls} />
        </div>
        <div className="w-full  mobile:hidden tablet:flex tablet:flex-col desktop:hidden  gap-[32px] ">
          <ProductDetailContainer description={product.description ?? ""} />
          <ShippingDetailsContainer />
        </div>
      </div>
      <PurchasingContainer
        id={product.id}
        name={product.name}
        category={product.category.name}
        currency={"USD"}
        variants={product.variants}
        description={product.description ?? ""}
      />
    </div>
  );
}
