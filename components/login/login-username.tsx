"use client";

import Link from "next/link";
import { useRef } from "react";
import LoginInput from "./login-input";
import LoginButton from "./login-button";
import FormContainer from "./form-container";

export default function LoginUserName() {
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <FormContainer>
      <LoginInput
        label="Email or mobile phone number"
        palceholder="Email or Mobile phone Number"
        name="username"
        id="username"
        type="text"
        inputRef={nameRef}
        defaultValue={""}
      />
      <div className="flex flex-col w-full gap-[8px]">
        <LoginButton label="Continue" href="/login/auth" />

        <div className="flex gap-[5px] text-[14px] font-[400] leading-[24px]">
          <p className=" text-login-text-secondary">Not a member?</p>
          <Link
            className=" text-login-text-primary text-[14px] font-[500] leading-[24px]"
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </FormContainer>
  );
}
