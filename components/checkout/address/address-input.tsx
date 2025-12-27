import { FieldValues, UseFormRegister } from "react-hook-form";
export default function AddressInput({
  label,
  name,
  register,
}: {
  label?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <label className="flex flex-col w-full gap-[8px]" htmlFor={name}>
      <p className="flex">{label}</p>
      <input
        className="flex w-full"
        id={name}
        type="text"
        disabled
        {...register(`address.0.${name}`)}
      />
    </label>
  );
}
