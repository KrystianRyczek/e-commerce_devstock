import SuccessIcon from "./svg/succes";

export default function SuccessContainer() {
  return (
    <div className="flex flex-col mx-auto w-[640px] gap-[24px] p-[40px] bg-payment-background border-[1px] border-payment-border rounded-[6px]">
      <SuccessIcon />
      <h1 className="flex mx-auto text-28-40-500 -tracking-[0.02em]  text-payment-h">
        Thanks for Your Order!
      </h1>
      <p className="flex mx-auto text-16-26-500 text-center text-payment-text-secondary">
        INV/208421205/TSR/3385-B54
      </p>
      <div className="flex flex-col w-full gap-[16px]">
        <p className="text-18-28-500 text-payment-text-primary">
          Transaction Date
        </p>
        <p className="text-16-26-500 text-payment-text-secondary">
          Wednesday, August 9, 2023
        </p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <p className="text-18-28-500 text-payment-text-primary">
          Payment Method
        </p>
        <p className="text-16-26-500  text-payment-text-secondary">Apple Pay</p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <p className="text-18-28-500 text-payment-text-primary">
          Shipping Method
        </p>
        <p className="text-16-26-500 text-payment-text-secondary">
          NexusHub Courier
        </p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <h2 className="text-18-28-500 text-payment-text-primary">Your Order</h2>
        <div>{/* Order details would go here */}</div>
        <p className="text-16-26-500 text-payment-text-secondary">
          Total Product Price (10 Items)
        </p>
        <p className="text-16-26-500 text-payment-text-secondary">
          Total Product Protection
        </p>
        <p className="text-16-26-500 text-payment-text-secondary">
          Total Shipping Price
        </p>
        <p className="text-16-26-500 text-payment-text-secondary">
          Shipping Insurance
        </p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <div className="flex flex-col w-full gap-[16px]">
        <p className="text-18-28-500 text-payment-text-primary">
          Transaction Fees
        </p>
        <p className="text-16-26-500 text-payment-text-secondary">
          Service Fees
        </p>
      </div>
      <hr className="border-[1px] border-payment-border w-full"></hr>
      <p className="text-18-28-500 text-payment-text-primary">Grand total</p>
      <p className="text-18-28-500 text-payment-text-primary">Status</p>
    </div>
  );
}
