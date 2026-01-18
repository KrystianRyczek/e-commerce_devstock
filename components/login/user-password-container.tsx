import LoginInput from "./login-input";
import LoginButton from "./login-button";
import Link from "next/link";
import LoginCheckbox from "./login-checkbox";

export default function UserPasswordContainer({
  isVisible,
}: {
  isVisible: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-start ${
        isVisible ? "" : "invisible w-0 h-0"
      }`}
    >
      <LoginInput
        label="Password"
        id="hs-toggle-password"
        placeholder="Password"
        name="password"
        type="password"
        defaultValue={""}
      />
      <div className={`flex flex-col w-full h-full `}>
        <LoginButton label="Sign In" type={"submit"} />
        <div className="flex justify-between gap-[5px] text-[14px] font-[400] leading-[24px]">
          <LoginCheckbox label="Save password" />
          <Link
            className=" text-login-text-primary text-16-26-500"
            href="/reset"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
