import SuccessIcon from "@/components/register/succes/svg/succes-icon";
import Link from "next/link";

export default function SuccesPage() {
  return (
    <main className="w-full h-[625px] flex flex-col gap-[40px] justify-center items-center text-register-h">
      <SuccessIcon />
      <div className="flex flex-col justify-center items-center gap-[16px]">
        <h1 className="flex text-[44px] font-[700] leading-[54px]">
          Thank you!
        </h1>
        <p className="flex text-[24px] font-[500] leading-[36px]">
          You have succesfully register
        </p>
      </div>
      <div className="flex flex-col gap-[19px] items-center text-register-text-secondary text-[18px] font-[400] leading-[28px]">
        <p className="">
          Please check your e-mail for further information. Let’s exploring our
          products and enjoy many gifts.
        </p>
        <p className="">
          Having problem?{" "}
          <Link className="text-register-link" href="/support">
            Contact us
          </Link>
        </p>
      </div>
    </main>
  );
}
