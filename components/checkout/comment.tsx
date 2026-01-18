import { UseFormRegister } from "react-hook-form";
import { CartFormData } from "../cart/cart-form";

export default function Comment({
  name,
  register,
}: {
  name: string;
  register: UseFormRegister<CartFormData>;
}) {
  return (
    <input
      placeholder="Add a comment about your order..."
      type="hidden"
      id={`comment+${name}`}
      {...register(name)}
    />
  );
}
