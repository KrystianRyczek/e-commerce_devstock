import type { CartProduct } from "@/app/cart/page";
import CartCheckbox from "./cart-checkbox";
import Image from "next/image";
import DeleteCat from "./svg/delete-cart";
import Link from "next/link";

export default function CartCard({
  product,
  selllectNoneHandler,
}: {
  product: CartProduct;
  selllectNoneHandler: (id: number) => void;
}) {
  console.log(
    "CartCard Rendered:",
    product.name,
    "All Selected:",
    product.selected
  );
  return (
    <label className="w-full flex items-center gap-[16px]">
      <CartCheckbox
        label={`select-${product.id}`}
        checked={product.selected}
        onChange={() => {
          selllectNoneHandler(product.id);
        }}
      />
      <div className=" flex max-tablet:flex-col w-full p-[24px] rounded-[6px] border-[1px] border-cart-border bg-cart-background gap-[32px]">
        <div className="flex flex-col relative w-[172px] h-[138px] p-[12px] border-[1px] border-cart-border rounded-[6px]">
          <div className="relative w-full h-full">
            <Image src={product.img} alt={product.name} fill />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-full ">
            <div className="flex justify-between w-full mb-[12px]">
              <p className="text-[20px] font-[500] leading-[30px]">
                {product.name}
              </p>
              <DeleteCat />
            </div>
            <Link
              href={`/products/${product.id}`}
              className=" flex items-center justify-center mb-[16px] w-[80px] h-[36px] text-[14px] font-[500] leading-[24px] rounded-[6px] bg-cart-checkout-button-background text-cart-checkout-button-text"
            >
              {product.category}
            </Link>
            <div className="flex justify-between">
              <p className="text-[24px] font-[500] leading-[36px]">
                ${product.price}
              </p>
              <div className="hidden min-tablet:flex gap-[24px] items-center ">
                <Link
                  href="#"
                  className="text-[16px] font-[500] leading-[28px] text-cart-link"
                >
                  Write note
                </Link>
                <div className="h-[24px] border-[1px] border-cart-border"></div>
                <label className="flex relative w-[125px] h-[44px]">
                  <input
                    type="text"
                    className="flex text-center w-full h-full border-[1px] border-cart-input-border rounded-[6px] text-cart-input-text"
                    defaultValue={product.quantity}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-tablet:hidden mobile:flex-col gap-[24px] mobile:gap-[10px] items-center mobile:items-start">
          <Link
            href="#"
            className="text-[16px] font-[500] leading-[28px] text-cart-link"
          >
            Write note
          </Link>
          <div className="flex mobile:hidden h-[24px] border-[1px] border-cart-border"></div>
          <label className="flex relative w-[125px] h-[44px]">
            <input
              type="text"
              className="flex text-center w-full h-full border-[1px] border-cart-input-border rounded-[6px] text-cart-input-text"
              defaultValue={product.quantity}
            />
          </label>
        </div>
      </div>
    </label>
  );
}
