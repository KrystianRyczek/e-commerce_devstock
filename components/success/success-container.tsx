import Link from "next/link";
import SuccessIcon from "./svg/succes";

export default function SuccessContainer({
  orders,
}: {
  orders: {
    id: number;
    paymentStatus: string | null;
    totalPrice: number | null;
    createdAt: Date;
    updatedAt: Date;
    orderedProducts: {
      productName: string;
      quantity: number;
      price: number;
      protection: boolean;
    }[];
    shippingMethod: {
      name: string;
      price: number;
    } | null;
    paymentMethod: {
      name: string;
    } | null;
  }[];
}) {
  let quantityTotal = 0;
  let protectionTotal = 0;
  let productsPrice = 0;
  let totalShippingPrice = 0;
  let grandTotal = 0;
  orders.forEach((order) => {
    order.orderedProducts.forEach((product) => {
      quantityTotal += product.quantity;
      if (product.protection) {
        protectionTotal += 1;
      }
      productsPrice += product.quantity * product.price;
    });
    grandTotal += order.totalPrice || 0;
    totalShippingPrice += order.shippingMethod?.price || 0;
  });
  const shippingInsurance = quantityTotal * 2.67;
  return (
    <div className="flex flex-col mx-auto w-[640px] gap-[24px] p-[40px] bg-payment-background border-[1px] border-payment-border rounded-[6px]">
      <SuccessIcon />
      <h1 className="flex mx-auto text-28-40-500 -tracking-[0.02em]  text-payment-h">
        Thanks for Your Order!
      </h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p className="flex mx-auto text-16-26-500 text-center text-payment-text-secondary">
              Order no. {order.id}
            </p>
            <div className="flex w-full gap-[16px]">
              <p className="text-18-28-500 text-payment-text-primary">
                Transaction Date:
              </p>
              <p className="text-16-26-500 text-payment-text-secondary">
                {order.createdAt.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <p className="text-18-28-500 text-payment-text-primary">
          Payment Method
        </p>
        <p className="text-16-26-500  text-payment-text-secondary">
          {orders[0]?.paymentMethod?.name}
        </p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <p className="text-18-28-500 text-payment-text-primary">
          Shipping Method
        </p>
        <p className="text-16-26-500 text-payment-text-secondary">
          {orders[0]?.shippingMethod?.name}
        </p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <h2 className="text-18-28-500 text-payment-text-primary">Your Order</h2>
        <div>{/* Order details would go here */}</div>
        <p className="flex w-full justify-between text-16-26-500 text-payment-text-secondary">
          Total Product Price ({quantityTotal} Items)
          <span className="font-bold text-18-28-500">
            ${productsPrice.toFixed(2)}
          </span>
        </p>
        <p className=" flex w-full justify-between  text-16-26-500 text-payment-text-secondary">
          Total Product Protection ({protectionTotal} Items)
          <span className="font-bold text-18-28-500">
            ${protectionTotal.toFixed(2)}
          </span>
        </p>
        <p className="flex w-full justify-between  text-16-26-500 text-payment-text-secondary">
          Total Shipping Price
          <span className="font-bold text-18-28-500">
            ${totalShippingPrice.toFixed(2)}
          </span>
        </p>
        <p className="flex w-full justify-between text-16-26-500 text-payment-text-secondary">
          Shipping Insurance
          <span className="font-bold text-18-28-500">
            ${shippingInsurance.toFixed(2)}
          </span>
        </p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <p className="text-18-28-500 text-payment-text-primary">
          Transaction Fees
        </p>
        <p className="flex w-full justify-between text-16-26-500 text-payment-text-secondary">
          Service Fees <span className="font-bold text-18-28-500">$0.50</span>
        </p>
      </div>
      <hr className="border-[1px] border-payment-border"></hr>
      <p className="flex w-full justify-between text-18-28-500 text-payment-text-primary">
        Grand total:{" "}
        <span className="font-bold text-28-40-500">
          ${grandTotal.toFixed(2)}
        </span>
      </p>
      <p className="flex w-full justify-between text-18-28-500 text-payment-text-primary ">
        Status:
        <span className="w-[77px] h-[36px] font-bold bg-payment-status-background text-14-24-500 text-payment-status-text rounded-[6px] flex justify-center items-center">
          Success
        </span>
      </p>
      <Link
        href="/"
        className="w-full h-[54px] text-payment-button-text bg-payment-button-background rounded-[6px] flex justify-center items-center text-18-28-500"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
