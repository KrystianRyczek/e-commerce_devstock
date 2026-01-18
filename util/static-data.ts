import { symbol } from "zod";
import { NavLinkItem } from "./types";

export const itemPerPageArray: number[] = [6, 9, 12, 15, 18];
export const sortOptionArray: {
  name: string;
  filterName: string;
  order: string;
}[] = [
  { name: "Default order", filterName: "id", order: "asc" },
  { name: "Newest Arrivals", filterName: "createdAt", order: "desc" },
  { name: "Recommended", filterName: "recommended", order: "" },
  { name: "Lowest Price", filterName: "price", order: "asc" },
  { name: "Highest Price", filterName: "price", order: "desc" },
  { name: "Name: A to Z", filterName: "name", order: "asc" },
  { name: "Name: Z to A", filterName: "name", order: "desc" },
];
export const shippingInsuranceCost: number = 2.67;
export const protectionCost: number = 1.0;
export const serviceFees: number = 0.5;

export const navLinkArray: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contacts", label: "Contacts" },
];
export const currencys = [
  { name: "PLN", rate: 1, symbol: "PLN" },
  { name: "USD", rate: 4.0, symbol: "$" },
  { name: "EUR", rate: 4.5, symbol: "€" },
];
