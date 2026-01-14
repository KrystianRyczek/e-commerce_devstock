"use client";
import { useForm, useFieldArray } from "react-hook-form";
import type { CartProduct } from "@/app/cart/page";
import CartCard from "./cart-card";
import CartCheckbox from "./cart-checkbox";
import CheckoutContainer from "./checkout-container";

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
    formState: { errors },
  } = useForm<CartFormData>({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const sellecAllClickHandler = (defaultValues: CartFormData) => {
    defaultValues.items.forEach(
      (
        _item: {
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

  const onSubmit = handleSubmit((data): void => alert(JSON.stringify(data)));
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-[32px] w-[889px] max-desktop:w-full"
    >
      <input type="hidden" {...register(`totalItems`)} />
      <input type="hidden" {...register(`subtotal`)} />
      <div>
        <div>
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
        <CheckoutContainer register={register} watch={watch} />
      </div>
    </form>
  );
}
