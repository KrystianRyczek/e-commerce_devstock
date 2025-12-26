import Image, { type StaticImageData } from "next/image";
import ShoppingCart from "./shopping-cart";
import Link from "next/link";
type Product = {
  id: number;
  category: string;
  name: string;
  image: StaticImageData[];
  price: number;
  stock: number;
  currency: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex relative w-full">
      <Link className="w-full" href={`/product/${product.id}`}>
        <div className="w-full p-[16px] max-desktop:p-[8px] rounded-[6px] border-[1px] border-product-card-border bg-product-card-background">
          <div className="w-full h-[204px] max-desktop:h-[160px] relative">
            <Image
              src={product.image[0]}
              alt={product.name}
              fill
              className="rounded-[6px]"
            />
          </div>
          <div>
            <button className="mt-[12px] mb-[8px] px-[12px] py-[6px] bg-product-card-button-background text-product-card-button-text rounded-[6px] text-14-24-500">
              {product.category}
            </button>
            <div className="w-full h-[76px] text-product-card-text">
              <h3 className="text-18-28-400">{product.name}</h3>
              <p className="text-28-40-600 -tracking-[0.02rem]">
                {product.price} {product.currency}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <ShoppingCart />
    </div>
  );
}
