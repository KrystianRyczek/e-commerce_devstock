"use client";
import { useForm } from "react-hook-form";
import RegistrationInput from "./registration-input";
import RegisterSelect from "./registration-select";
import RegistrationCheckbox from "./registration-checkbox";
import Link from "next/link";
import RegistrationButton from "./registration-button";
import { schema } from "@/util/registration-form-data-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistationFormValuesProps } from "@/util/types";
import { signupAction } from "@/util/server-action";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistationFormValuesProps>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = handleSubmit(
    async (
      data: RegistationFormValuesProps
    ): Promise<void | { success: boolean; message?: string }> => {
      const error = await signupAction(data);
      if (error && !error.success) {
        console.log("Registration failed.");
      }
    }
  );

  return (
    <div className="flex flex-col gap-[32px] w-full h-full border-[1px] p-[24px] text-register-h border-register-border  bg-register-background">
      <div className="flex flex-col gap-[20px] w-full">
        <h2 className="text-18-28-500">Create Account</h2>
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
        <div>
          <div className="flex gap-[16px] justify-center items-center text-14-24-500 text-register-text-secondary">
            <RegistrationCheckbox
              label="conditionsAndPrivancy"
              register={register}
              error={errors.conditionsAndPrivancy}
            />
            <p className="w-[calc(100%-26px)] text-16-26-400">
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
          {errors.conditionsAndPrivancy && (
            <p className="text-register-input-border-error">
              {errors.conditionsAndPrivancy.message}
            </p>
          )}
        </div>
        <RegistrationButton />
      </form>
    </div>
  );
}
