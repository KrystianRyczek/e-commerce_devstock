"use client";

import Link from "next/link";
import LoginInput from "./login-input";
import LoginButton from "./login-button";
import FormContainer from "./form-container";
import { useRef, useState } from "react";
import LoginCheckbox from "./login-checkbox";

export default function SignInUser() {
  const loginRef = useRef<HTMLInputElement>(null);
  const [logInValueError, setLogInValueError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const goFowardHandler = () => {
    if (loginRef.current) {
      const value = loginRef.current.value;
      if (value.length === 0) {
        setLogInValueError("Please enter your email or mobile phone number.");
        return;
      }
    }
    setLogInValueError("");
    setIsVisible(false);
  };
  return (
    <FormContainer
      setIsVisible={setIsVisible}
      isVisible={isVisible}
      logInValueError={logInValueError}
    >
      <div
        className={`flex flex-col justify-start ${
          isVisible ? "" : "invisible w-0 h-0"
        }`}
      >
        <LoginInput
          label="Email or mobile phone number"
          palceholder="Email or Mobile phone Number"
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
      <div
        className={`flex flex-col justify-start ${
          !isVisible ? "" : "invisible w-0 h-0"
        }`}
      >
        <LoginInput
          label="Password"
          id="hs-toggle-password"
          palceholder="Password"
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
    </FormContainer>
  );
}
