import SlideShow from "@/components/product-details/slide-show";
import PurchasingContainer from "@/components/product-details/purchasing-container";
import ProductDescription from "@/components/product-details/product-description";

export default function ProductDetails({ product }: { product: any }) {
  return (
    <div className="w-full h-[628px] text-white flex gap-[32px] items-start p-[40px] max-desktop:px-[8px] ">
      <div className="flex gap-[40px] w-[889px] h-[548px]">
        <div className="w-[422px] h-[472px] relative">
          <SlideShow imagesArray={product.imgs} />
        </div>
        <ProductDescription
          name={product.name}
          category={product.category}
          price={product.price}
          currency={product.currency}
          description={product.description}
        />
      </div>
      <PurchasingContainer
        stock={product.stock}
        variants={product.variants}
        price={product.price}
      />
    </div>
  );
}
