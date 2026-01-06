"use server";
import { CartProduct } from "./types";
import { cookies } from "next/headers";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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
    return { success: true };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { success: false };
  }
};
