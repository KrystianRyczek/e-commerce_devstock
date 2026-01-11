"use server";
import { CartProduct, RegistationFormValuesProps } from "./types";
import { cookies } from "next/headers";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { redirect } from "next/navigation";
import { hashSync } from "bcrypt-ts-edge";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { success, z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Not a valid email!"),
});
const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/.$/, "Numer telefonu jest wymagany!")
    .regex(
      /[+]{1}[(]{1}[0-9]{2,}[)]{1}[0-9]{1,}$/,
      "Invalid phone number format! Example: +(Code country) 9 digit mobile number"
    )
    .min(14, "Podany numer jest zbyt krótki!")
    .max(14, "Podany numer jest zbyt długi!"),
});
const passwordSchema = z.object({
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
});

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const addToCartAction = async (product: CartProduct) => {
  "use server";
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("No session cart ID found in cookies.");
    }
    const userId = null; // Use null for guest carts - replace with actual user ID retrieval logic when user is logged in

    const cart = await prisma.cartItems.findFirst({
      where: {
        sesionCart: sessionCartId,
        productId: product.id,
        variantId: product.variantId,
      },
    });
    if (!cart) {
      await prisma.cartItems.create({
        data: {
          sesionCart: sessionCartId,
          userId: userId,
          productId: product.id,
          variantId: product.variantId,
          quantity: product.quantity,
          price: product.price,
          subtotal: product.subtotal,
        },
      });
    }
    await prisma.cartItems.updateMany({
      where: {
        sesionCart: sessionCartId,
        productId: product.id,
        variantId: product.variantId,
      },
      data: {
        quantity: { increment: product.quantity },
        subtotal: { increment: product.subtotal },
      },
    });
    console.log(`Product ${product.name} added to cart successfully.`);
    return { success: true, message: "Product added to cart successfully." };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { success: false, message: "Failed to add product to cart." };
  }
};
export const removeFromCartAction = async (
  productId: number,
  variantId: number
) => {
  "use server";
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("No session cart ID found in cookies.");
    }
    await prisma.cartItems.updateMany({
      where: {
        sesionCart: sessionCartId,
        productId: productId,
        variantId: variantId,
      },
      data: {
        active: false,
      },
    });
    return {
      success: true,
      message: "Product removed from cart successfully.",
    };
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return { success: false, message: "Failed to remove product from cart." };
  }
};

export const signupAction = async (data: RegistationFormValuesProps) => {
  "use server";
  try {
    const existingUser = await prisma.users.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }
    const user = await prisma.users.create({
      data: {
        email: data.email,
        phone: data.phone,
        password: hashSync(
          data.password,
          process.env.SALT ? parseInt(process.env.SALT) : 10
        ),
        active: true,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Registration failed." };
  }
  redirect("/login?callbackUrl=/register");
};
export const logInWithCredentialsAction = async (
  prevState: unknown,
  formData: FormData
) => {
  "use server";
  try {
    const isEmail = emailSchema.safeParse({ email: formData.get("login") });
    const isPhone = phoneSchema.safeParse({ phone: formData.get("login") });
    const isPassword = passwordSchema.safeParse({
      password: formData.get("password"),
    });
    if (!isEmail.success && !isPhone.success) {
      return {
        success: false,
        message:
          "Invalid login format (email:jon@jon.com or phone:+(country code) 9 digit).",
      };
    }
    let user;
    if (isEmail.success && isPassword.success) {
      user = {
        email: formData.get("login") as string,
        password: formData.get("password") as string,
      };
    } else if (isPhone.success && isPassword.success) {
      user = {
        phone: formData.get("login") as string,
        password: formData.get("password") as string,
      };
    }
    await signIn("credentials", user);
    return { success: true, message: "Login successful." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Login failed, invalid credentials." };
  }
};

export const logOutAction = async () => {
  "use server";
  try {
    await signOut();
    return { success: true, message: "Logout successful." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Logout failed." };
  }
};
