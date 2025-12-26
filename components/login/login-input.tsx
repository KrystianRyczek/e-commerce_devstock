"use client";

import { useState } from "react";
import LoginEye from "./svg/login-eye";
import LoginEyeOff from "./svg/login-eye-off";

export default function LoginInput({
  label,
  palceholder,
  name,
  id,
  type,
  inputRef,
  defaultValue,
}: {
  label: string;
  palceholder: string;
  name: string;
  id: string;
  type: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  defaultValue: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <label
      className="relative flex flex-col gap-[16px] w-full mb-[32px]"
      htmlFor={name}
    >
      <p className="flex text-18-28-500">{label}</p>
      <div className="flex relative w-full h-[48px]">
        <input
          className="flex w-full h-full text-14-24-400 placeholder:text-login-palaceholder bg-transparent border-[1px] border-login-border rounded-[4px] px-[12px] text-white placeholder-login-text"
          type={isVisible ? "text" : type}
          id={id}
          name={name}
          placeholder={palceholder}
          ref={inputRef}
          defaultValue={defaultValue}
        />
        {type === "password" &&
          (isVisible ? (
            <LoginEyeOff toggleVisibility={toggleVisibility} />
          ) : (
            <LoginEye toggleVisibility={toggleVisibility} />
          ))}
      </div>

      <button
        type="button"
        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
      ></button>
    </label>
  );
}
