import { useRef } from "react";
import CheckoutModal from "../common-components/modal";
import Link from "next/link";
import { CheckoutFormData, UserAddress } from "@/util/types";
import { UseFormSetValue } from "react-hook-form";

export default function UserAddressSelector({
  label,
  setLabel,
  userAddressArray,
  setValue,
  setSelectedAddress,
}: {
  label: string;
  setLabel: (label: string) => void;
  userAddressArray: UserAddress[];
  setValue: UseFormSetValue<CheckoutFormData>;
  setSelectedAddress: (address: UserAddress) => void;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const clickHandler = () => {
    modalRef.current?.showModal();
  };

  const addressSelectHandler = (address: UserAddress) => {
    setLabel(address.name);
    setValue("address.0.address", address.address);
    setValue("address.0.country", address.country);
    setValue("address.0.province", address.province);
    setValue("address.0.city", address.city);
    setValue("address.0.zip", address.zip);
    setSelectedAddress(address);
    modalRef.current?.close();
  };
  return (
    <div className="flex relative gap-[10px]">
      <CheckoutModal ref={modalRef}>
        <h2 className=" text-modal-h text-24-36-500 -tracking-[0.02rem]">
          Select Shipping Address
        </h2>
        <hr className="border-1px border-modal-border"></hr>
        <ul className="flex flex-col gap-[16px]">
          {userAddressArray.map((address: UserAddress) => (
            <li key={address.id}>
              <button
                className="flex gap-[16px] w-full h-[200px] bg-modal-option-background border-[1px] border-modal-option-border rounded-[6px] p-[16px] text-modal-text"
                onClick={() => {
                  addressSelectHandler(address);
                  modalRef.current?.close();
                }}
                type="button"
              >
                <div className="flex flex-col gap-[40px] w-full text-16-26-500">
                  <div className="flex flex-col w-full gap-[12px]">
                    <div className="flex w-full gap-[16px]">
                      <p>Address:</p>
                      <p className="flex min-w-[120px] h-[30px] bg-checkout-button-background text-checkout-button-text rounded-[6px] items-center justify-center text-14-24-500">
                        {address.name}
                      </p>
                    </div>
                    <p className="flex w-full">{address.address}</p>
                  </div>
                  <div className="flex w-full gap-[8px]">
                    <div className="flex flex-col w-1/4">
                      <p>Country:</p>
                      <p>{address.country}</p>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <p>Province:</p>
                      <p>{address.province}</p>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <p>City:</p>
                      <p>{address.city}</p>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <p>Postal Code:</p>
                      <p>{address.zip}</p>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </CheckoutModal>
      <div className="flex w-full gap-[16px] items-center text-16-26-500">
        <p>Address:</p>
        <div className="flex w-full justify-between">
          <Link
            href="#"
            className="flex min-w-[120px] h-[30px] bg-checkout-button-background text-checkout-button-text rounded-[6px] items-center justify-center text-14-24-500"
          >
            {label}
          </Link>
          <button
            className=" text-cart-link"
            type="button"
            onClick={clickHandler}
          >
            Change Address
          </button>
        </div>
      </div>
    </div>
  );
}
