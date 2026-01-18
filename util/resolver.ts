import { Resolver } from "react-hook-form";
import { FilterFormData } from "./types";
import { z } from "zod";
("");
export const resolver: Resolver<FilterFormData> = async (
  values,
  context,
  options
) => {
  const minIsEmpty = !values.price?.min;
  const minIsNumber = !isNaN(
    Number(values.price.min?.toString().replace(",", "."))
  );
  const maxIsEmpty = !values.price?.max;
  const maxIsNumber = !isNaN(
    Number(values.price.max?.toString().replace(",", "."))
  );
  let minLessThanMax = true;
  if (Number(values.price.max?.toString().replace(",", ".")) !== 0) {
    minLessThanMax =
      Number(values.price.min?.toString().replace(",", ".")) <=
      Number(values.price.max?.toString().replace(",", "."));
  }
  const name = options?.names?.map((name: string) => name).includes("price.min")
    ? "min"
    : "max";
  return {
    values:
      (!minIsNumber && !minIsEmpty) ||
      (!maxIsNumber && !maxIsEmpty) ||
      (!minLessThanMax && !minIsEmpty && !maxIsEmpty)
        ? {}
        : {
            ...values,
            price: {
              max: Number(values.price.max?.toString().replace(",", ".")),
              min: Number(values.price.min?.toString().replace(",", ".")),
            },
          },
    errors:
      !minLessThanMax &&
      !minIsEmpty &&
      !maxIsEmpty &&
      minIsNumber &&
      maxIsNumber
        ? {
            price: {
              type: "price",
              message: "Max price must be greater than min price.",
            },
          }
        : name === "min" && !minIsNumber && !minIsEmpty
        ? {
            price: {
              min: {
                type: "price",
                message: "Invalid min price number format.",
              },
            },
          }
        : name === "max" && !maxIsNumber && !maxIsEmpty
        ? {
            price: {
              max: {
                type: "price",
                message: "Invalid max price number format.",
              },
            },
          }
        : {},
  };
};
export const emailSchema = z.object({
  email: z.string().email("Not a valid email!"),
});
export const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/.$/, "Numer telefonu jest wymagany!")
    .regex(
      /[+]{1}[(]{1}[0-9]{2,}[)]{1}[0-9]{1,}$/,
      "Invalid phone number format! Example: +(Code country) 9 digit mobile number"
    )
    .min(14, "Podany numer jest zbyt krótki!")
    .max(14, "Podany numer jest zbyt długi!"),
});
export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /\d+/,
      "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
    )
    .regex(
      /\W+/,
      "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
    )
    .regex(
      /[A-Z]+/,
      "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
    )
    .regex(
      /[a-z]+/,
      "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
    ),
});
