"use client";
import { useState } from "react";
import LoginEye from "./svg/login-eye";
import LoginEyeOff from "./svg/login-eye-off";
import type { FieldErrors } from "react-hook-form";
import type { FormValues } from "./registration-form";

export default function RegistrationInput({
  label,
  name,
  id,
  type,
  defaultValue,
  placeholder,
  errors,
  register,
}: {
  label: string;
  name: keyof FormValues;
  id: string;
  type: string;
  defaultValue: string;
  placeholder: string;
  errors: FieldErrors<FormValues> | undefined;
  register: any;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-[16px] w-full text-register-h"
    >
      <p className="flex text-[18px] font-[500] leading-[28px]">{label}</p>
      <div className="flex relative w-full h-[48px]">
        <input
          className={`w-full h-[54px] rounded-[6px] placeholder:text-register-placeholder text-register-text-primary border-[1px] ${
            errors?.[name]
              ? "border-register-input-border-error"
              : "border-register-border"
          } text-[16px] font-[400] leading-[26px] focus:outline-none px-3`}
          name={name}
          id={id}
          type={isVisible ? "text" : type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...register(name)}
        />
        {type === "password" &&
          (isVisible ? (
            <LoginEyeOff toggleVisibility={toggleVisibility} />
          ) : (
            <LoginEye toggleVisibility={toggleVisibility} />
          ))}
      </div>

      <p className="text-[14px] font-[400] leading-[24px] text-register-error-text">
        {errors?.[name]?.message}
      </p>
    </label>
  );
}
