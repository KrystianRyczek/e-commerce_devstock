import { Resolver } from "react-hook-form";
import { FilterFormData } from "./types";

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
