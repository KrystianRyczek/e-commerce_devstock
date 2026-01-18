import Link from "next/link";
import LoginInput from "./login-input";
import LoginButton from "./login-button";

export default function UserNameContainer({
  isVisible,
  loginRef,
  goFowardHandler,
}: {
  isVisible: boolean;
  loginRef: React.RefObject<HTMLInputElement | null>;
  goFowardHandler: () => void;
}) {
  return (
    <div
      className={`flex flex-col justify-start ${
        isVisible ? "" : "invisible w-0 h-0"
      }`}
    >
      <LoginInput
        label="Email or mobile phone number"
        placeholder="Email or Mobile phone Number"
        name="login"
        id="login"
        type="text"
        defaultValue={""}
        loginRef={loginRef}
      />

      <div className="flex flex-col w-full gap-[8px]">
        <LoginButton
          label="Continue"
          type="button"
          goFowardHandler={goFowardHandler}
        />

        <div className="flex gap-[5px] text-14-24-400">
          <p className=" text-login-text-secondary">Not a member?</p>
          <Link
            className=" text-login-text-primary text-14-24-500"
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
