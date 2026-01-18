import type { PaymentMethod, CheckoutFormData } from "@/util/types";
import { useRef, useState, useEffect } from "react";
import CheckoutModal from "../common-components/modal";
import Image from "next/image";
import SelectContainer from "../common-components/select-container";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { imageLoader } from "@/util/image-loader";

export default function PaymentSelect({
  paymentMethodsArray,
  register,
  setValue,
}: {
  paymentMethodsArray: PaymentMethod[];
  register: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodsArray[0]);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  useEffect(() => {
    setValue("payment", paymentMethod.id);
  }, []);

  return (
    <div className="flex relative">
      <CheckoutModal ref={modalRef}>
        <h2 className=" text-modal-h text-24-36-500">Select Payment Method</h2>
        <hr className="border-1px border-modal-border"></hr>
        <ul className="flex flex-col gap-[16px]">
          {paymentMethodsArray.map((method: PaymentMethod) => (
            <li key={method.id}>
              <button
                className="flex gap-[16px] w-full h-[58px] bg-modal-option-background border-[1px] border-modal-option-border rounded-[6px] p-[16px] text-modal-text"
                onClick={() => {
                  setPaymentMethod(method);
                  setValue("payment", method.id);
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
                </div>
              </button>
            </li>
          ))}
        </ul>
      </CheckoutModal>
      <div className="flex flex-col w-full">
        <legend className="mb-[16px] text-24-36-500">Payment</legend>
        <SelectContainer
          openModal={openModal}
          register={register}
          img={paymentMethod.imgUrl}
          label={paymentMethod.name}
        />
      </div>
    </div>
  );
}
