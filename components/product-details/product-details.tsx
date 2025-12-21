import SlideShow from "@/components/product-details/slide-show";
import PurchasingContainer from "@/components/product-details/purchasing-container";
import ProductDescription from "@/components/product-details/product-description";

export default function ProductDetails({ product }: { product: any }) {
  return (
    <div className="w-full text-white flex gap-[32px] max-desktop:gap-[18px] items-start p-[40px] max-desktop:px-[8px] ">
      <div className="flex max-desktop:flex-col gap-[40px] w-[889px] max-tablet:w-full">
        <div className="w-[422px] max-tablet:w-full h-[472px] max-tablet:h-[380px] relative">
          <SlideShow imagesArray={product.imgs} />
        </div>
        <div className="min-tablet:hidden">
          <PurchasingContainer
            name={product.name}
            category={product.category}
            currency={product.currency}
            price={product.price}
            stock={product.stock}
            variants={product.variants}
          />
        </div>
        <ProductDescription
          name={product.name}
          category={product.category}
          price={product.price}
          currency={product.currency}
          description={product.description}
        />
      </div>
      <div className="max-tablet:hidden">
        <PurchasingContainer
          name={product.name}
          category={product.category}
          currency={product.currency}
          price={product.price}
          stock={product.stock}
          variants={product.variants}
        />
      </div>
    </div>
  );
}
