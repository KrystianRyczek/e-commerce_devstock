"use client";
import type { ShippingMethod, CheckoutFormData } from "@/util/types";
import { useRef, useState, useEffect } from "react";
import CheckoutModal from "../common-components/modal";
import Image from "next/image";
import SelectContainer from "../common-components/select-container";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { imageLoader } from "@/util/image-loader";
export default function ShippingSelect({
  shippingMethodsArray,
  register,
  setValue,
}: {
  shippingMethodsArray: ShippingMethod[];
  register: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [shippingMethod, setShippingMethod] = useState(shippingMethodsArray[0]);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  useEffect(() => {
    setValue("shipping", shippingMethod.id);
  }, []);

  return (
    <>
      <CheckoutModal ref={modalRef}>
        <h2 className=" text-modal-h text-24-36-500">Select Shipping Method</h2>
        <hr className="border-1px border-modal-border"></hr>
        <ul className="flex flex-col gap-[16px]">
          {shippingMethodsArray.map((method: ShippingMethod) => (
            <li key={method.id}>
              <button
                className="flex gap-[16px] w-full h-[58px] bg-modal-option-background border-[1px] border-modal-option-border rounded-[6px] p-[16px] text-modal-text"
                onClick={() => {
                  setShippingMethod(method);
                  setValue("shipping", method.id);
                  modalRef.current?.close();
                }}
                type="button"
              >
                <div className="flex relative w-[26px] h-[full]">
                  <Image
                    loader={(config) => imageLoader(config, "")}
                    src={method.imgUrl}
                    alt={method.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex w-full justify-between text-18-28-500">
                  <p>{method.name}</p>
                  <p>${method.price}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </CheckoutModal>
      <div className="flex flex-col w-full">
        <legend className="mb-[16px] text-24-36-500">Shipping</legend>
        <SelectContainer
          openModal={openModal}
          register={register}
          img={shippingMethod.imgUrl}
          label={shippingMethod.name}
        />
      </div>
    </>
  );
}
