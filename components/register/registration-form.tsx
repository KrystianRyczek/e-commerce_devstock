"use client";
import React from "react";
import { useForm, useWatch, Control, Resolver } from "react-hook-form";
import RegistrationInput from "./registration-input";
import RegisterSelect from "./registration-select";
import RegistrationCheckbox from "./registration-checkbox";
import Link from "next/link";
import RegistrationButton from "./registration-button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    email: z.email("Not a valid email!"),
    phone: z
      .string()
      .regex(/.$/, "Numer telefonu jest wymagany!")
      .regex(
        /[+]{1}[(]{1}[0-9]{2,}[)]{1}[0-9]{1,}$/,
        "Invalid phone number format! Example: +(Code country) 9 digit mobile number"
      )
      .min(14, "Podany numer jest zbyt krótki!")
      .max(14, "Podany numer jest zbyt długi!"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /\d+/,
        "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
      )
      .regex(
        /\W+/,
        "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
      )
      .regex(
        /[A-Z]+/,
        "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
      )
      .regex(
        /[a-z]+/,
        "Password at least 8 characters and includes at least upper case letter, lower case letter and number."
      ),

    confirmPassword: z.string(),
    country: z.string().nonempty("Country is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormValues = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  ConditionsAndPrivancy: boolean;
};

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = handleSubmit((data): void => alert(JSON.stringify(data)));

  return (
    <div className="flex flex-col gap-[32px] w-full h-full border-[1px] p-[24px] text-register-h border-register-border  bg-register-background">
      <div className="flex flex-col gap-[20px] w-full">
        <h2 className="text-[24px] font-[600] leading-[34px]">
          Create Account
        </h2>
        <hr className="text-register-border"></hr>
      </div>
      <form className="flex flex-col gap-[24px] w-full" onSubmit={onSubmit}>
        <RegistrationInput
          label="Email"
          id="email"
          name="email"
          type="text"
          defaultValue=""
          placeholder="Your Email"
          errors={errors}
          register={register}
        />
        <RegistrationInput
          label="Mobile Number"
          id="phone"
          name="phone"
          type="text"
          defaultValue=""
          placeholder="+(Code country) 9 digit mobile number "
          errors={errors}
          register={register}
        />
        <RegistrationInput
          label="Password"
          id="password"
          name="password"
          type="password"
          defaultValue=""
          placeholder="Password"
          errors={errors}
          register={register}
        />
        <RegistrationInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          defaultValue=""
          placeholder="Confirm Password"
          errors={errors}
          register={register}
        />
        <RegisterSelect
          label="Country or region"
          name="country"
          errors={errors}
          register={register}
          countryseArray={["Polska", "USA", "Kanada", "Peru", "RPA", "Chiny"]}
        />
        <div className="flex gap-[16px] justify-center items-center text-[14px] font-[500] leading-[24px] text-register-text-secondary">
          <RegistrationCheckbox
            label="ConditionsAndPrivancy"
            register={register}
          />
          <p className="w-[calc(100%-26px)] ">
            By creating an account and check, you agree to the{" "}
            <Link href="#" className="text-register-link">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-register-link">
              Privacy Notice
            </Link>
            .
          </p>
        </div>
        <RegistrationButton />
      </form>
    </div>
  );
}
