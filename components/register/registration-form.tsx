"use client";
import React from "react";
import { useForm, useWatch, Control, Resolver } from "react-hook-form";
import RegistrationInput from "./registration-input";
import RegisterSelect from "./registration-select";
import RegistrationCheckbox from "./registration-checkbox";
import Link from "next/link";
import RegistrationButton from "./registration-button";

export type FormValues = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  ConditionsAndPrivancy: boolean;
};

const resolver: Resolver<FormValues> = async (values) => {
  console.log(values);

  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

// function IsolateReRender({ control }: { control: Control<FormValues> }) {
//   const firstName = useWatch({
//     control,
//     name: "firstName",
//     defaultValue: "default",
//   });

//   return <div style={{ color: "white" }}>{firstName}</div>;
// }

export default function RegistrationForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: resolver,
    defaultValues: {},
  });

  const onSubmit = handleSubmit((data: FormValues): void =>
    alert(JSON.stringify(data))
  );

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
        {/* <IsolateReRender control={control} /> */}
      </form>
    </div>
  );
}
