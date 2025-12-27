import NewAddressSelect from "./new-address-select";
import AddressCheckbox from "./address-checkbox";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { CheckoutFormData } from "../checout-form";
export default function NewAddress({
  register,
}: {
  register: UseFormRegister<CheckoutFormData>;
}) {
  return (
    <fieldset className="flex flex-col w-full gap-[16px] mt-[16px]">
      <div className="flex flex-col w-full justify-between gap-[10px]">
        <div className="flex">
          <NewAddressSelect
            register={register}
            placeholder="Country"
            name="country"
            options={[
              { label: "Poland", value: "poland" },
              { label: "Germany", value: "germany" },
              { label: "France", value: "france" },
            ]}
          />
          <NewAddressSelect
            register={register}
            placeholder="Province"
            name="province"
            options={[
              { label: "Lesser Poland", value: "lesser poland" },
              { label: "Masovia", value: "masovia" },
              { label: "Pomerania", value: "pomerania" },
            ]}
          />
        </div>
        <div className="flex">
          <NewAddressSelect
            register={register}
            placeholder="City"
            name="city"
            options={[
              { label: "Kraków", value: "krakow" },
              { label: "Warszawa", value: "warszawa" },
              { label: "Gdańsk", value: "gdansk" },
            ]}
          />
          <NewAddressSelect
            register={register}
            placeholder="Postal Code"
            name="zip"
            options={[
              { label: "30-001", value: "30-001" },
              { label: "00-001", value: "00-001" },
              { label: "80-001", value: "80-001" },
            ]}
          />
        </div>
      </div>

      <textarea
        className="flex h-[130px] resize-none border-[1px] border-checkout-address-input p-[10px] rounded-[6px] text-checkout-text-primary placeholder-checkout-input-placeholder"
        placeholder="Street"
        {...register("address.0.street")}
      />
      <AddressCheckbox name="main" index={0} register={register} />
    </fieldset>
  );
}
