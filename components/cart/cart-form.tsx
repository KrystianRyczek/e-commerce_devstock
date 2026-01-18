"use client";
import { useForm } from "react-hook-form";
import type { CartProduct } from "@/app/cart/page";
import CartCard from "./cart-card";
import CartCheckbox from "./cart-checkbox";
import CheckoutContainer from "./checkout-container";
import { useRef, useState } from "react";
import MsgBox from "@/components/toast/message-box";
import { submitCartAction } from "@/util/server-action";
export type CartFormData = any;
// {
//   checkAll: boolean;
//   products: { [key: string]: string | number | boolean }[];
// };

export default function CartForm({
  cartProducts,
}: {
  cartProducts: CartProduct[];
}) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const timer = useRef<NodeJS.Timeout | null>(null);

  const defaultValues = {
    checkAll: true,
    totalItems: cartProducts.reduce(
      (sum, product) => sum + product.quantity,
      0
    ),
    subtotal: cartProducts
      .reduce((sum, product) => sum + +product.price * +product.quantity, 0)
      .toFixed(2),
    items: cartProducts.map((product) => ({
      name: product.name,
      imgUrl: product.imgUrls.url,
      brand: product.brand,
      category: product.category,
      color: product.color,
      productId: product.productId,
      variantId: product.variantId,
      price: product.price,
      selected: true,
      quantity:
        product.quantity > product.stock ? product.stock : product.quantity,
      comment: "Please deliver between 9 AM - 5 PM",
      deleted: false,
    })),
  };
  const {
    control,

    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isLoading },
  } = useForm<CartFormData>({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const sellecAllClickHandler = (defaultValues: CartFormData) => {
    defaultValues.items.forEach(
      (
        _item: {
          name: String;
          imgUrl: String;
          brand: String;
          category: String;
          color: String;
          productId: Number;
          variantId: Number;
          price: Number;
          selected: Boolean;
          quantity: Number;
          comment: String;
          deleted: Boolean;
        },
        index: number
      ) => {
        setValue(
          `items.[${index}].selected`,
          (defaultValues.items[index].selected = !defaultValues.checkAll)
        );
        setValue(
          "subtotal",
          !defaultValues.checkAll
            ? cartProducts.reduce(
                (price, product) => price + product.price * product.quantity,
                0
              )
            : 0
        );
        setValue(
          "totalItems",
          !defaultValues.checkAll
            ? cartProducts.reduce(
                (count, product) => count + product.quantity,
                0
              )
            : 0
        );
      }
    );
  };
  const formData = watch();

  const onSubmit = handleSubmit(async (data): Promise<CartFormData> => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (data.subtotal == 0) {
      setToast({
        show: true,
        message: "Please select at least one item to checkout",
        type: "info",
      });
      timer.current = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
      return;
    }
    const response = await submitCartAction(data);
    console.log("Checkout response:", response);
    if (response?.success) {
      setToast({
        show: true,
        message: "Checkout successful!",
        type: "success",
      });
      timer.current = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    } else {
      setToast({
        show: true,
        message: "Checkout failed. Please try again.",
        type: "error",
      });
      timer.current = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    }
  });
  return (
    <>
      {toast.show ? <MsgBox type={toast.type} msg={toast.message} /> : null}
      <form onSubmit={onSubmit} className="flex w-full">
        <input type="hidden" {...register(`totalItems`)} id="totalItems" />
        <input type="hidden" {...register(`subtotal`)} id="subtotal" />

        <div className="flex w-full gap-[32px] max-desktop:w-full max-desktop:flex-col">
          <div className="flex flex-col w-[889px] max-desktop:w-full">
            <div className="flex gap-[16px] w-full max-tablet:pr-[16px] max-tablet:flex-row-reverse">
              <CartCheckbox
                label="Select All Items"
                name="checkAll"
                style="flex items-center cursor-pointer"
                register={register}
                onClickHandler={() => sellecAllClickHandler(getValues())}
              />
              <p>Select All Items</p>
            </div>
            {cartProducts.map((product, index) => (
              <CartCard
                key={index}
                index={index}
                product={product}
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
            ))}
          </div>
          <CheckoutContainer
            register={register}
            formData={formData}
            isLoading={isLoading}
          />
        </div>
      </form>
    </>
  );
}
