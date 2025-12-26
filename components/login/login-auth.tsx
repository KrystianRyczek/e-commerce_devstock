"use client";

import Link from "next/link";
import { useRef } from "react";
import LoginInput from "./login-input";
import LoginButton from "./login-button";
import LoginCheckbox from "./login-checkbox";
import FormContainer from "./form-container";

export default function LoginAuth() {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <FormContainer>
      <LoginInput
        label="Password"
        id="hs-toggle-password"
        palceholder="Password"
        name="password"
        type="password"
        inputRef={passwordRef}
        defaultValue={""}
      />
      <div className="flex flex-col w-full gap-[8px]">
        <LoginButton label="Sign In" href={""} />
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
    </FormContainer>
  );
}
