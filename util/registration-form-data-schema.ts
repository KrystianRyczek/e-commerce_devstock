import { z } from "zod";

export const schema = z
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
    conditionsAndPrivancy: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
