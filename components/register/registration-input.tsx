"use client";
import { useState } from "react";
import LoginEye from "./svg/login-eye";
import LoginEyeOff from "./svg/login-eye-off";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegistationFormValues } from "./registration-form";

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
  name: keyof RegistationFormValues;
  id: string;
  type: string;
  defaultValue: string;
  placeholder: string;
  errors: FieldErrors<RegistationFormValues> | undefined;
  register: UseFormRegister<RegistationFormValues>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-[16px] w-full text-register-h"
    >
      <p className="flex text-18-28-500">{label}</p>
      <div className="flex relative w-full h-[48px]">
        <input
          className={`w-full h-[54px] rounded-[6px] placeholder:text-register-placeholder text-register-text-primary border-[1px] ${
            errors?.[name]
              ? "border-register-input-border-error"
              : "border-register-border"
          } text-16-26-400 focus:outline-none px-3`}
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

      <p className="text-16-26-400 text-register-error-text">
        {errors?.[name]?.message}
      </p>
    </label>
  );
}
