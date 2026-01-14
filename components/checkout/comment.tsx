import { UseFormRegister } from "react-hook-form";
import { CartFormData } from "../cart/cart-form";

export default function Comment({
  name,
  defaultValue,
  register,
}: {
  name: string;
  defaultValue?: string;
  register: UseFormRegister<CartFormData>;
}) {
  return (
    <label htmlFor={`comment+${name}`}>
      <input
        placeholder="Add a comment about your order..."
        type="hidden"
        id={`comment+${name}`}
        {...register(name)}
      />
    </label>
  );
}
