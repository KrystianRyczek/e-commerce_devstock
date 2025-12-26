export default function NewAddressSelect({
  register,
  name,
  placeholder,
  options,
}: {
  register: (name: string) => any;
  name: string;
  placeholder: string;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      name={name}
      id={name}
      className="flex w-full h-[40px] border-[1px] border-checkout-address-input p-[10px] rounded-[6px] text-checkout-text-primary bg-checkout-background"
      {...register(`address.0.${name}`)}
      value={options[0].value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
