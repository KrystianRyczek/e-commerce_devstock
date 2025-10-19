import PaymentListItem from "./payment-list-item";
import Visa from "@/public/payment-services/Visa.png";
import MasterCard from "@/public/payment-services/Mastercard.png";
import PayPal from "@/public/payment-services/Paypal.png";
import ApplePay from "@/public/payment-services/APay.png";
import GooglePay from "@/public/payment-services/GPay.png";
import ContentList from "./content-list";

export default function Footer() {
  return (
    <footer className="w-full min-h-[474px] bg-footer-backgroud mt-auto flex max-desktop:flex-col max-desktop:gap-10 max-desktop:px-10 justify-center items-center pb-20">
      <div className="w-[532px] max-desktop:w-full flex flex-col gap-[24px]">
        <h2 className="text-logoOrange font-semibold text-[36px] leading-[46px] tracking-[-0.02rem]">
          {/* Bogrwarner */}
          Devstock
          <span className="text-logoNeutral">Hub</span>
        </h2>
        <p className="text-footer-text">
          © 2023 DevstockHub. All rights reserved.
        </p>
        <ul className="flex gap-[12px]">
          <PaymentListItem img={Visa} alt="Visa payment service" />
          <PaymentListItem img={MasterCard} alt="MasterCard payment service" />
          <PaymentListItem img={PayPal} alt="PayPal payment service" />
          <PaymentListItem img={ApplePay} alt="ApplePay payment service" />
          <PaymentListItem img={GooglePay} alt="GooglePay payment service" />
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
