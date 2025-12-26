"use client";
import { UserAddress } from "@/app/cart/checkout/page";
import AddressInput from "./address-input";
import { useEffect, useState } from "react";
import Address from "./address";
import AddressSwitch from "./address-switch";
import UserAddressSelector from "./user-address-seletor";
import NewAddress from "./new-address";

export default function AddressContainer({
  userAddressArray,
  register,
  setValue,
  remove,
  insert,
}: {
  userAddressArray: UserAddress[];
  register: (name: string) => any;
  setValue: (name: string, value: string | number) => void;
  remove: (index: number) => void;
  insert: (index: number, value: UserAddress) => void;
}) {
  const [newAddressSelected, setNewAddressSelected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress>(
    userAddressArray[0]
  );
  const [label, setLabel] = useState("Main Address");

  useEffect(() => {
    if (!newAddressSelected) {
      setLabel(selectedAddress.name);
      setValue("address.0.street", selectedAddress.street);
      setValue("address.0.country", selectedAddress.country);
      setValue("address.0.province", selectedAddress.province);
      setValue("address.0.city", selectedAddress.city);
      setValue("address.0.zip", selectedAddress.zip);
    }
  }, [newAddressSelected]);

  return (
    <div className="flex flex-col w-full">
      <legend className="mb-[16px] text-24-36-500">Address</legend>
      <div className="flex flex-col gap-[16px] w-full p-[24px] rounded-[6px] bg-checkout-background border-[1px] border-checkout-border text-checkout-h">
        <AddressSwitch
          newAddressSelected={newAddressSelected}
          setNewAddressSelected={setNewAddressSelected}
          remove={remove}
          insert={insert}
        />
        {!newAddressSelected && (
          <div className="flex flex-col gap-[16px] w-full">
            <UserAddressSelector
              label={label}
              setLabel={setLabel}
              userAddressArray={userAddressArray}
              setValue={setValue}
              setSelectedAddress={setSelectedAddress}
            />
            <Address register={register} />
          </div>
        )}
        {newAddressSelected && <NewAddress register={register} />}
      </div>
    </div>
  );
}
