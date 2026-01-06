"use client";
import { useForm } from "react-hook-form";
import type { ProductFormData, PurchasingContainerParams } from "@/util/types";
import SubmitButton from "@/components/product-details/submit-button";
import ColorRadio from "@/components/product-details/color-radio";
import QuantityInput from "@/components/product-details/quantity-input";
import ShippingDetailsContainer from "@/components/product-details//common-components/shipping-details-container";
import ProductDetailContainer from "@/components/product-details//common-components/product-detail-container";
import ProductPriceContainer from "@/components/product-details//common-components/product-price-container";
import ProductNameContainer from "@/components/product-details//common-components/product-name-container";
import SubtotalContainer from "./subtotal-container";
import { addToCartAction } from "@/util/server-action";

export default function PurchasingContainer({
  id,
  name,
  category,
  description,
  currency,
  variants,
}: PurchasingContainerParams) {
  const defaultValues = {
    name: name,
    color: variants[0].color,
    quantity: 1,
    subtotal: variants[0].stock !== 0 ? variants[0].price : 0,
    id: id,
    variantId: variants[0].id,
    price: variants[0].price,
  };

  const {
    formState: { isSubmitting },
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProductFormData>({
    mode: "onChange",
    defaultValues,
  });

  const currentFormData = watch("color");
  const currentQuantity = getValues("quantity");

  const currentVariant = variants.find(
    (variant) => variant.color === currentFormData
  );
  setValue("variantId", +(currentVariant?.id || 0));
  setValue("price", +(currentVariant?.price || 0));

  if (+currentQuantity > +(currentVariant?.stock || 0)) {
    setValue("quantity", +(currentVariant?.stock || 0));
    setValue(
      "subtotal",
      +((currentVariant?.stock || 0) * (currentVariant?.price || 0)).toFixed(2)
    );
  } else {
    setValue(
      "subtotal",
      +(+currentQuantity * (currentVariant?.price || 0)).toFixed(2)
    );
  }
  return (
    <div className="flex max-desktop:flex-col w-full gap-[32px]">
      <div className="w-fit flex flex-col gap-[32px] text-product-description-h ">
        <ProductNameContainer name={name} category={category} />
        <ProductPriceContainer
          price={currentVariant?.price || 0}
          currency={currency}
        />
        <div className="w-full flex flex-col gap-[32px] max-desktop:hidden">
          <ProductDetailContainer description={description} />
          <ShippingDetailsContainer />
        </div>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          addToCartAction({
            id: data.id,
            name: data.name,
            variantId: data.variantId,
            price: data.price,
            quantity: data.quantity,
            subtotal: data.subtotal,
          });
        })}
        className="w-full p-[24px] max-desktop:p-[16px] flex flex-col gap-[32px] max-desktop:gap-[20px] rounded-[6px] border-[1px] border-purchasing-container-border bg-purchasing-container-background text-purchasing-container-h"
      >
        <fieldset
          className="flex flex-wrap gap-[16px] max-desktop:gap-[9px]"
          name="color"
        >
          <legend className="mb-[14px] max-desktop:mb-[8px] text-18-28-500">
            Color:
          </legend>
          {variants &&
            variants.map((variant: { color: string }, index: number) => (
              <ColorRadio
                key={variant.color + index}
                index={index}
                label="color"
                color={variant.color}
                checked={index === 0}
                register={register}
              />
            ))}
        </fieldset>
        <div className="w-full flex flex-wrap gap-[14px] max-desktop:gap-[8px]">
          <legend className="w-full text-18-28-500">Quantity:</legend>
          <QuantityInput
            price={currentVariant?.price || 0}
            stock={currentVariant?.stock || 0}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
          <span className="ml-[16px] h-[54px] flex items-center text-16-26-500 text-purchasing-container-stock-text">
            Stock: {currentVariant?.stock || 0}
          </span>
        </div>
        <SubtotalContainer
          defaultValue={defaultValues.subtotal}
          currency={"USD"}
          register={register}
        />
        <SubmitButton disabled={isSubmitting || currentVariant?.stock === 0} />
      </form>
      <div className="w-full flex flex-col gap-[32px] min-tablet:hidden">
        <ProductDetailContainer description={description} />
        <ShippingDetailsContainer />
      </div>
    </div>
  );
}
