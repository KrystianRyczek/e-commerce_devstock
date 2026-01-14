"use client";

import { useState } from "react";
import LoginEye from "./svg/login-eye";
import LoginEyeOff from "./svg/login-eye-off";
import { LoginInputParams } from "@/util/types";

export default function LoginInput({
  label,
  palceholder,
  name,
  id,
  type,
  defaultValue,
  loginRef,
}: LoginInputParams) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <label
      className={`relative flex flex-col gap-[16px] w-full mb-[32px]`}
      htmlFor={name}
    >
      <p className="flex text-18-28-500">{label}</p>
      <div className="flex relative w-full h-[48px]">
        <input
          className="flex w-full h-full text-14-24-400 placeholder:text-login-palaceholder bg-transparent border-[1px] border-login-border rounded-[4px] px-[12px] text-white placeholder-login-text"
          type={isVisible ? "text" : type}
          id={id}
          name={name}
          ref={loginRef}
          placeholder={palceholder}
          defaultValue={
            ""
            // name === "login"
            //   ? process.env.DEFAULT_ADMIN
            //   : process.env.DEFAULT_PASSWORD
          }
        />
        {type === "password" &&
          (isVisible ? (
            <LoginEyeOff toggleVisibility={toggleVisibility} />
          ) : (
            <LoginEye toggleVisibility={toggleVisibility} />
          ))}
      </div>
    </label>
  );
}
