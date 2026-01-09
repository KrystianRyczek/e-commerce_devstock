import PaymentListItem from "./payment-list-item";
import ContentList from "./content-list";
import { paymentMethods } from "@/util/fetching-data";

const paymentMethodsArray: { [key: string]: string }[] = await paymentMethods;

export default async function Footer() {
  return (
    <footer className="w-full min-h-[474px] bg-footer-background mt-auto flex max-desktop:flex-col max-desktop:gap-10 max-desktop:px-10 justify-center items-center pb-20">
      <div className="w-[532px] max-desktop:w-full flex flex-col gap-[24px]">
        <h2 className="text-logoOrange font-semibold text-36-46-600 -tracking-[0.02rem]">
          Devstock
          <span className="text-logoNeutral">Hub</span>
        </h2>
        <p className="text-footer-text text-16-26-500">
          © 2023 DevstockHub. All rights reserved.
        </p>
        <ul className="flex gap-[12px]">
          {paymentMethodsArray.map((method) => (
            <PaymentListItem
              key={method.name}
              img={method.imgUrl}
              alt={`${method.name} payment service`}
            />
          ))}
          {/* 
          <PaymentListItem img={Visa} alt="Visa payment service" />
          <PaymentListItem img={MasterCard} alt="MasterCard payment service" />
          <PaymentListItem img={PayPal} alt="PayPal payment service" />
          <PaymentListItem img={ApplePay} alt="ApplePay payment service" />
          <PaymentListItem img={GooglePay} alt="GooglePay payment service" /> */}
        </ul>
      </div>
      <ul className="flex min-desktop:gap-[8px] max-desktop:w-full max-desktop:justify-between max-tablet:flex-wrap text-footer-h max-tablet:gap-y-[40px]">
        <li>
          <h3>Company</h3>
          <ContentList contents={["About Us", "Contact", "Partner"]} />
        </li>
        <li>
          <h3>Social</h3>
          <ContentList
            contents={["Instagram", "Twitter", "Facebook", "LinkedIn"]}
          />
        </li>
        <li>
          <h3>FAQ</h3>
          <ContentList
            contents={["Account", "Deliveries", "Orders", "Payments"]}
          />
        </li>
        <li>
          <h3>Resources</h3>
          <ContentList contents={["E-books", "Tutorials", "Course", "Blog"]} />
        </li>
      </ul>
    </footer>
  );
}
