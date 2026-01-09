import { ReactNode } from "react";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { StaticImageData } from "next/image";

export type RecommendedProduct = {
  id: number;
  name: string;
  variantId: number;
  price: number;
  prevPrice: number;
  category: string;
  imgUrls: string;
};
export type Category = {
  id: number;
  name: string;
  imgUrl: { url: string } | null;
};

export type SectionCard = {
  label: string;
  image: string | undefined;
};
export type ProductCard = {
  id: number;
  name: string;
  category: { name: string };
  description: string | null;
  imgUrls: { url: string }[];
  variants: {
    id: number;
    tag: string;
    color: string;
    stock: number;
    price: number;
    prevPrice: number;
  }[];
};
export type ProductFormData = {
  id: number;
  name: string;
  variantId: number;
  price: number;
  quantity: number;
  subtotal: number;
  color: string;
};
export type CartProduct = {
  id: number;
  name: string;
  variantId: number;
  price: number;
  quantity: number;
  subtotal: number;
};

export type FilterFormData = {
  show: number;
  sort: string;
  categoryAll: boolean;
  category: (boolean | string)[];
  brandAll: boolean;
  brand: (boolean | string)[];
  price: {
    min: number | null;
    max: number | null;
  };
  currencys: {
    minCurrency: string;
    minCurrencyIcon: string;
    maxCurrency: string;
    maxCurrencyIcon: string;
  };
};
export type PurchasingContainerParams = {
  name: string;
  id: number;
  category: string;
  description: string;
  currency: string;
  variants: {
    color: string;
    stock: number;
    price: number;
    id: number;
    tag: string;
  }[];
};
export type BrandsArray = {
  id: number;
  name: string;
  imgUrl: { url: string } | null;
};
export type SectionParams = {
  children: ReactNode;
  title: string;
  href: string | undefined;
};
export type LoginInputParams = {
  label: string;
  palceholder: string;
  name: string;
  id: string;
  type: string;
  defaultValue: string;
  loginRef?: React.RefObject<HTMLInputElement | null>;
};
export type colorRadioParams = {
  index: number;
  label: string;
  color: string;
  checked: boolean;
  register: UseFormRegister<ProductFormData>;
};

export type ProductDescriptionParams = {
  name: string;
  category: string;
  price: number;
  currency: string;
  description: string;
};
export type QuantityInputParams = {
  price: number;
  stock: number;
  register: UseFormRegister<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  getValues: UseFormGetValues<ProductFormData>;
};

export type SubtotalContainerParams = {
  defaultValue: number;
  currency: string;
  register: UseFormRegister<ProductFormData>;
};
export type FilterContainerParams = {
  label: string;
  children: React.ReactNode;
};
export type CurrencySelectParams = {
  label: string;
  curencyNameArray: string[];
  register: UseFormRegister<FilterFormData>;
  getValues: UseFormGetValues<FilterFormData>;
  setValue: UseFormSetValue<FilterFormData>;
};
export type PriceFilterParams = {
  currentCurrency: { name: string; rate: number }[];
  errors: FieldErrors<FilterFormData>;
  register: UseFormRegister<FilterFormData>;
  getValues: UseFormGetValues<FilterFormData>;
  setValue: UseFormSetValue<FilterFormData>;
};

export type PriceInputParams = {
  curencyNameArray: string[];
  currencyIcon: string;
  label: string;
  register: UseFormRegister<FilterFormData>;
  getValues: UseFormGetValues<FilterFormData>;
  setValue: UseFormSetValue<FilterFormData>;
};
export type SelectFilterParams = {
  label: string;
  selectOptions: { name: string }[];
  register: UseFormRegister<FilterFormData>;
  setValue: UseFormSetValue<FilterFormData>;
  getValues: UseFormGetValues<FilterFormData>;
};
export type SelectInputParams = {
  label: string;
  fitertype: string;
  index?: number;
  register: UseFormRegister<FilterFormData>;
  setValue: UseFormSetValue<FilterFormData>;
  getValues: UseFormGetValues<FilterFormData>;
};
export type SortOptionInputParams = {
  label: string;
  name: string;
  itemPerPageArray?: number[];
  sortOptionArray?: { name: string; filterName: string; order: string }[];
  register: UseFormRegister<FilterFormData>;
};
export type SideBarParams = {
  brands: { name: string }[];
  categories: { name: string }[];
  currencys: { name: string; rate: number }[];
};
export type ProductsPageProductCard = {
  id: number;
  name: string;
  category: { name: string };
  brand: { name: string };
  imgUrls: { url: string }[];
  variants: { id: number; price: number; prevPrice: number }[];
};
export type QueryParams = {
  categories: string[];
  brands: string[];
  min: number;
  max: number;
  show: number;
  page: number;
  sort: string;
};
export type RegistationFormValuesProps = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  conditionsAndPrivancy: boolean;
};
