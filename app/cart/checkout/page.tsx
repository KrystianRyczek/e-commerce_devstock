import type { StaticImageData } from "next/image";
import NavigationBar from "@/components/checkout/navigation-bar";
import monitor1 from "@/public/products-card/monitor1.png";
import maus1 from "@/public/products-card/maus1.png";
import kayboard1 from "@/public/products-card/kayboard1.png";
import CheckoutForm from "@/components/checkout/checout-form";

import inpost from "@/public/shipping-methods/inpost.png";
import dpd from "@/public/shipping-methods/dpd.png";
import dhl from "@/public/shipping-methods/dhl.png";

import mastercard from "@/public/payment-services/Mastercard.png";
import paypal from "@/public/payment-services/Paypal.png";
import visa from "@/public/payment-services/visa.png";

const cartProductsArray = [
  {
    id: 1,
    name: "Product 1",
    img: maus1,
    category: "Mouse",
    price: 29.99,
    quantity: 2,
    stock: 10,
    selected: true,
  },
  {
    id: 2,
    name: "Product 2",
    img: kayboard1,
    category: "Keyboard",
    price: 49.99,
    quantity: 1,
    stock: 5,
    selected: true,
  },
  {
    id: 3,
    name: "Product 3",
    img: monitor1,
    category: "Monitor",
    price: 199.99,
    quantity: 6,
    stock: 10,
    selected: true,
  },
];
export type CartProduct = {
  id: number;
  name: string;
  img: StaticImageData;
  category: string;
  price: number;
  quantity: number;
  stock: number;
  selected: boolean;
};

const userAddressArray = [
  {
    id: 1,
    name: "Main",
    main: true,
    country: "USA",
    province: "IL",
    city: "Springfield",
    zip: "62701",
    street: "123 Main St",
  },
  {
    id: 2,
    name: "Work",
    main: false,
    country: "USA",
    province: "IL",
    city: "Springfield",
    zip: "62702",
    street: "456 Work Ave",
  },
  {
    id: 3,
    name: "Other",
    main: false,
    country: "USA",
    province: "IL",
    city: "Springfield",
    zip: "62703",
    street: "789 Other Rd",
  },
];
export type UserAddress = {
  id: number;
  name: string;
  main: boolean;
  country: string;
  province: string;
  city: string;
  zip: string;
  street: string;
};

const shippingMethodsArray = [
  {
    id: 1,
    name: "Standard Shipping",
    img: inpost,
    estimatedDelivery: "3-5 business days",
    cost: 5.99,
  },
  {
    id: 2,
    name: "Express Shipping",
    img: dpd,
    estimatedDelivery: "1-2 business days",
    cost: 12.99,
  },
  {
    id: 3,
    name: "Overnight Shipping",
    img: dhl,
    estimatedDelivery: "1 business day",
    cost: 24.99,
  },
];
export type ShippingMethod = {
  id: number;
  name: string;
  img: StaticImageData;
  estimatedDelivery: string;
  cost: number;
};

const paymentMethodsArray = [
  {
    id: 1,
    name: "Credit Card",
    img: mastercard,
  },
  {
    id: 2,
    name: "PayPal",
    img: paypal,
  },
  {
    id: 3,
    name: "Visa",
    img: visa,
  },
];
export type PaymentMethod = {
  id: number;
  name: string;
  img: StaticImageData;
};

export default function CheckoutPage() {
  return (
    <main className="flex flex-col gap-[32px] w-full min-h-[612px] p-[40px] max-tablet:p-[8px] max-desktop:p-[20px]">
      <NavigationBar />
      <CheckoutForm
        cartProductsArray={cartProductsArray}
        userAddressArray={userAddressArray}
        shippingMethodsArray={shippingMethodsArray}
        paymentMethodsArray={paymentMethodsArray}
      />
    </main>
  );
}
