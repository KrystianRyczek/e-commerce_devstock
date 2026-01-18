"use server";
import { CartProduct, RegistationFormValuesProps } from "./types";
import { cookies } from "next/headers";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { redirect } from "next/navigation";
import { hashSync } from "bcrypt-ts-edge";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";
import { emailSchema, phoneSchema, passwordSchema } from "@/util/resolver";
import { CartFormData } from "@/components/cart/cart-form";
import { serviceFees, shippingInsuranceCost } from "./static-data";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const addToCartAction = async (product: CartProduct) => {
  "use server";
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    const user = await auth();
    if (!sessionCartId) {
      throw new Error("No session cart ID found in cookies.");
    }
    const currentUserId = user ? Number(user.user.id) : null;
    const item = await prisma.productVariants.findFirst({
      where: { productId: product.id, id: product.variantId },
      select: { stock: true },
    });
    if (item && item.stock < 1) {
      return {
        success: false,
        message: "Cannot add items due to insufficient stock.",
      };
    }
    const cart = await prisma.cartItems.findFirst({
      where: {
        OR: [{ sessionCart: sessionCartId }, { userId: currentUserId }],

        productId: product.id,
        variantId: product.variantId,
        active: true,
        ordered: false,
      },
    });
    if (!cart?.id) {
      await prisma.cartItems.create({
        data: {
          sessionCart: sessionCartId,
          userId: currentUserId,
          productId: product.id,
          variantId: product.variantId,
          quantity: product.quantity,
          price: product.price,
          subtotal: product.subtotal,
        },
      });
      revalidatePath(`/cart`, "layout");
      return { success: true, message: "Product added to cart successfully." };
    }
    if (
      item?.stock &&
      cart !== null &&
      cart.quantity + product.quantity > item.stock
    ) {
      return {
        success: false,
        message: "Cannot add more items than available in stock.",
      };
    }
    await prisma.cartItems.updateMany({
      where: {
        OR: [{ sessionCart: sessionCartId }, { userId: currentUserId }],
        productId: product.id,
        variantId: product.variantId,
        active: true,
        ordered: false,
      },
      data: {
        quantity: { increment: product.quantity },
        subtotal: { increment: product.subtotal },
      },
    });
    revalidatePath(`/cart`, "layout");
    return { success: true, message: "Product added to cart successfully." };
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { success: false, message: "Failed to add product to cart." };
  }
};
export const removeItemFromCartAction = async (
  productId: number,
  variantId: number
) => {
  "use server";
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("No session cart ID found in cookies.");
    }
    const user = await auth();
    const userId = user ? Number(user.user.id) : null;
    await prisma.cartItems.updateMany({
      where: {
        OR: [{ sessionCart: sessionCartId }, { userId: userId }],
        AND: [{ productId: productId }, { variantId: variantId }],
      },
      data: {
        active: false,
      },
    });
    revalidatePath(`/`, "layout");
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
export const submitCartAction = async (formData: CartFormData) => {
  "use server";
  try {
    const user = await auth();
    if (!user) {
      redirect("/login?callbackUrl=/cart");
    }
    const cookiesList = await cookies();
    const sessionCartId = cookiesList.get("sessionCartId")?.value;

    const order = await prisma.orders.createManyAndReturn({
      data: {
        userId: Number(user.user.id),
      },
    });
    formData.items.forEach(async (item: CartFormData) => {
      if (item.selected) {
        await prisma.orderedProduct.createMany({
          data: {
            orderId: order[0].id,
            productId: item.productId,
            productName: item.name,
            variantId: item.variantId,
            img: item.imgUrl,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            brand: item.brand,
            category: item.category,
            comment: item.comment,
          },
        });
        await prisma.cartItems.updateMany({
          where: {
            sessionCart: sessionCartId,
            productId: item.productId,
            variantId: item.variantId,
            active: true,
            ordered: false,
          },
          data: {
            active: false,
            ordered: true,
          },
        });
      }
      return;
    });
    revalidatePath(`/cart`, "layout");
    redirect("/cart/checkout");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error submitting cart:", error);
    return { success: false, message: "Failed to submit cart." };
  }
};

export const submitOrderAction = async (formData: any) => {
  "use server";

  try {
    console.log("Submitting order with data:", formData);
    formData.orders.forEach(async (order: any) => {
      if (formData.ordersId.includes(order[0].orderId)) {
        order.forEach(async (product: any, index: number) => {
          if (index === 0) {
            await prisma.orders.updateMany({
              where: { id: +product.orderId },
              data: {
                shippingMethodId: +formData.shipping,
                paymentMethodId: +formData.payment,
                addressId: formData.address[0]?.id || null,
                paymentStatus: "pending",
              },
            });
          }
          console.log("Processing product:", product);
          await prisma.orderedProduct.updateMany({
            where: {
              orderId: +product.orderId,
              productId: +product.productId,
              variantId: +product.variantId,
            },
            data: {
              quantity: +product.quantity,
              comment: product.comment || "",
              protection: product.protection || false,
            },
          });
          const shippingMethodPrice =
            (
              await prisma.shippingMethods.findUnique({
                where: { id: formData.shipping },
              })
            )?.price || 0;
          const protectionCost = product.protection ? 1 : 0;
          console.log(
            "Shipping method:",
            shippingMethodPrice +
              product.quantity *
                (protectionCost +
                  +product.price +
                  shippingInsuranceCost +
                  serviceFees)
          );
          await prisma.orders.updateMany({
            where: { id: +product.orderId },
            data: {
              totalPrice:
                shippingMethodPrice +
                product.quantity *
                  (protectionCost +
                    +product.price +
                    shippingInsuranceCost +
                    serviceFees),
            },
          });
        });
      }
    });
    const paymentMethod = await prisma.paymentMethods.findUnique({
      where: { id: formData.payment },
      select: { type: true },
    });
    const ordersParams = formData.ordersId
      .reduce((acc: string, orderId: any) => {
        acc += `${orderId}$`;
        return acc;
      }, "ordersId=")
      .slice(0, -1);

    redirect(
      "/cart/checkout/payment?method=" +
        paymentMethod?.type +
        "&" +
        ordersParams
    );
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error submitting order:", error);

    return { success: false, message: "Failed to submit order." };
  }
};
export const orderStatusChangeAction = async (orders: number[]) => {
  "use server";
  try {
    await prisma.orders.updateMany({
      where: { id: { in: orders } },
      data: {
        paymentStatus: "paid",
      },
    });
    return { success: true, message: "Order status updated successfully." };
  } catch (error) {
    console.error("Error changing order status:", error);
    return { success: false, message: "Failed to change order status." };
  }
};
