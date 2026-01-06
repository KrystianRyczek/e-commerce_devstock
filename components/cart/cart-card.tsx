import type { CartProduct } from "@/app/cart/page";
import CartCheckbox from "./cart-checkbox";
import Image from "next/image";
import DeleteCat from "./svg/delete-cart";
import Link from "next/link";
import QuantityInput from "./quantity-input";
import { useRef } from "react";
import { imageLoader } from "@/util/image-loader";

export default function CartCard({
  product,
  setCartProducts,
}: {
  product: CartProduct;
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}) {
  const quantityRef = useRef<HTMLInputElement | null>(null);

  const deleteHandler = (id: number, color: string) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter(
        (product) => product.id !== id || product.color !== color
      )
    );
  };
  const quantityChangeHandler = (
    id: number,
    color: string,
    quantity: number
  ) => {
    setCartProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex(
        (product) => product.id === id && product.color === color
      );
      if (productIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity,
        };
        return updatedProducts;
      }
      return prevProducts;
    });
  };

  const addHandler = (stock: number) => {
    if (quantityRef.current) {
      const currentValue = quantityRef.current.value
        ? +quantityRef.current.value
        : 0;
      if (currentValue < stock) {
        quantityRef.current.value = (currentValue + 1).toString();
        quantityChangeHandler(product.id, product.color, +currentValue + 1);
      }
    }
  };
  const subtractHandler = () => {
    if (quantityRef.current) {
      const currentValue = quantityRef.current.value
        ? +quantityRef.current.value
        : 0;
      if (currentValue > 1) {
        quantityRef.current.value = (currentValue - 1).toString();
        quantityChangeHandler(product.id, product.color, +currentValue - 1);
      }
    }
  };

  const selllectOneHandler = (id: number, color: string) => {
    setCartProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex(
        (product) => product.id === id && product.color === color
      );
      if (productIndex !== -1) {
        const updatedProducts = [...prevProducts];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          selected: !updatedProducts[productIndex].selected,
        };
        return updatedProducts;
      }
      return prevProducts;
    });
  };
  return (
    <label className="w-full flex items-center gap-[16px] relative">
      <CartCheckbox
        label={`select${product.id + " " + product.color}`}
        style="flex items-center cursor-pointer max-tablet:absolute max-tablet:top-[16px] max-tablet:right-[16px]"
        checked={product.selected}
        onChange={() => selllectOneHandler(product.id, product.color)}
      />
      <div className=" flex max-tablet:flex-col w-full p-[24px] max-tablet:p-[10px] rounded-[6px] border-[1px] border-cart-border bg-cart-background gap-[32px]">
        <div className="flex flex-col relative w-[172px] h-[138px] p-[12px] border-[1px] border-cart-border rounded-[6px]">
          <div className="relative w-full h-full">
            <Image
              loader={(config) => imageLoader(config, "")}
              src={product.imgUrls.url}
              alt={product.name}
              fill
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-full ">
            <div className="flex justify-between w-full mb-[12px] ">
              <div className="flex flex-col w-full gap-[16px]">
                <p className="text-20-30-500">{product.name}</p>
                <p className="text-20-30-500 flex items-center gap-[8px]">
                  Color:{" "}
                  <span
                    style={{
                      backgroundColor: product.color,
                      borderRadius: "6px",
                    }}
                    className="h-6 w-6"
                  ></span>
                </p>
              </div>

              <DeleteCat
                onClick={() => deleteHandler(product.id, product.color)}
              />
            </div>
            <Link
              href={`/products/${product.id}`}
              className=" flex items-center justify-center mb-[16px] w-[80px] h-[36px] text-14-24-500 rounded-[6px] bg-cart-checkout-button-background text-cart-checkout-button-text"
            >
              {product.category}
            </Link>
            <div className="max-tablet:flex-col flex justify-between">
              <p className="text-24-36-500">${product.price}</p>
              <div className="flex gap-[24px] items-center max-tablet:justify-between ">
                <Link
                  href="#"
                  className="text-[16px] font-[500] leading-[28px] text-cart-link"
                >
                  Write note
                </Link>
                <div className="h-[24px] border-[1px] border-cart-border"></div>
                <QuantityInput
                  key={`quantity${product.id}`}
                  defautlValue={product.quantity}
                  stock={product.stock}
                  quantityRef={quantityRef}
                  subtractHandler={subtractHandler}
                  addHandler={() => addHandler(product.stock)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}
