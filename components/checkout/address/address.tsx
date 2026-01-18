import AddressInput from "./address-input";
import { UseFormRegister } from "react-hook-form";
import { CheckoutFormData } from "@/util/types";
export default function Address({
  register,
}: {
  register: UseFormRegister<CheckoutFormData>;
}) {
  return (
    <fieldset className="flex flex-col gap-[16px] w-full text-18-28-500">
      <AddressInput name="address" register={register} />
      <div className="flex w-full text-16-26-500">
        <AddressInput label="Country" name="country" register={register} />
        <AddressInput label="Province" name="province" register={register} />
        <AddressInput label="City" name="city" register={register} />
        <AddressInput label="Postal Code" name="zip" register={register} />
      </div>
    </fieldset>
  );
}
