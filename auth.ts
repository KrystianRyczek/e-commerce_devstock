import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig, Session } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { cookies } from "next/headers";
import {
  cartItemsBySessionCart,
  cartItemsByUserAndNotSessionCartID,
  updateCartItemsBySessionCart,
} from "@/util/fetching-data";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      avatar?: string | null;
      cart?: string | null;
      role?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    avatar?: string | null;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    name?: string | null;
    email: string;
    avatar?: string | null;
    sessionCartId?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: string;
    email: string;
    name?: string | null;
    avatar?: string | null;
    sessionCartId?: string | null;
    role?: string | null;
  }
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const config = {
  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        phone: {
          label: "Phone",
          type: "text",
          placeholder: "+(Code country) 9 digit",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) {
          return null;
        }
        const user = await prisma.users.findFirst({
          where: {
            OR: [
              { email: credentials.email || undefined },
              { phone: credentials.phone || undefined },
            ],
          },
          select: {
            id: true,
            email: true,
            role: true,
            avatar: true,
            password: true,
            active: true,
          },
        });

        if (user && user.password) {
          const isMatchingPassword = compareSync(
            credentials.password as string,
            user.password
          );
          if (!isMatchingPassword) {
            return null;
          }
          return {
            id: user.id.toString(),
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({
      session,
      user,
      trigger,
      token,
    }: {
      session: Session;
      user: {
        id: string;
        email?: string | null;
        avatar?: string | null;
        sessionCartId?: string | null;
        role?: string | null;
      };
      trigger?: string;
      token: {
        sub: string;
        email: string;
        avatar?: string | null;
        sessionCartId?: string | null;
        role?: string | null;
      };
    }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.avatar = token.avatar;
        session.user.cart = token.sessionCartId;
        session.user.role = token.role;
      }

      if (trigger === "update") {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.avatar = token.avatar;
        session.user.cart = token.sessionCartId;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.avatar = user.avatar;
        token.role = user.role;

        if (trigger === "signIn" || trigger === "signUp") {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get("sessionCartId")?.value;
          if (sessionCartId) {
            const sessionCartItems = await cartItemsBySessionCart(
              sessionCartId
            );
            const otherSessionCartItems =
              await cartItemsByUserAndNotSessionCartID(
                Number(user.id),
                sessionCartId
              );

            if (sessionCartItems.length > 0) {
              await updateCartItemsBySessionCart(
                sessionCartId,
                Number(user.id)
              );
              await Promise.all(
                otherSessionCartItems.map(async (otherSessionCartItem) => {
                  const index = sessionCartItems.findIndex(
                    (sessionCartItem) =>
                      sessionCartItem.productId ===
                        otherSessionCartItem.productId &&
                      sessionCartItem.color === otherSessionCartItem.color
                  );
                  if (index === -1) {
                    await prisma.cartItems.updateMany({
                      where: {
                        AND: [
                          { userId: Number(user.id) },
                          { productId: otherSessionCartItem.productId },
                          { variantId: otherSessionCartItem.variantId },
                          { active: true },
                          { ordered: false },
                        ],
                      },
                      data: { active: false },
                    });
                    await prisma.cartItems.create({
                      data: {
                        sessionCart: sessionCartId,
                        userId: Number(user.id),
                        productId: otherSessionCartItem.productId,
                        variantId: otherSessionCartItem.variantId,
                        quantity: otherSessionCartItem.quantity,
                        price: otherSessionCartItem.price,
                        subtotal:
                          otherSessionCartItem.price *
                          otherSessionCartItem.quantity,
                      },
                    });
                    return;
                  }
                  await prisma.cartItems.updateMany({
                    where: {
                      AND: [
                        { userId: Number(user.id) },
                        { sessionCart: sessionCartId },
                        { productId: sessionCartItems[index].productId },
                        { variantId: sessionCartItems[index].variantId },
                        { active: true },
                        { ordered: false },
                      ],
                    },
                    data: {
                      quantity:
                        sessionCartItems[index].quantity +
                        otherSessionCartItem.quantity,
                    },
                  });
                  await prisma.cartItems.updateMany({
                    where: {
                      AND: [
                        { userId: Number(user.id) },
                        { sessionCart: otherSessionCartItem.sessionCartId },
                        { productId: otherSessionCartItem.productId },
                        { variantId: otherSessionCartItem.variantId },
                        { active: true },
                        { ordered: false },
                      ],
                    },
                    data: {
                      active: false,
                    },
                  });
                })
              );
            }
            if (
              sessionCartItems.length === 0 &&
              otherSessionCartItems.length > 0
            ) {
              cookiesObject.set(
                "sessionCartId",
                otherSessionCartItems[0].sessionCartId
              );

              const map = new Map<string, (typeof otherSessionCartItems)[0]>();

              otherSessionCartItems.forEach((item) => {
                const existing = map.get(item.name);
                if (existing) {
                  existing.quantity += item.quantity;
                } else {
                  map.set(item.name, {
                    ...item,
                  });
                }
              });
              const mergedOtherSessionCartItems = Array.from(map.values());
              await Promise.all(
                mergedOtherSessionCartItems.map(async (item) => {
                  await prisma.cartItems.updateMany({
                    where: {
                      AND: [
                        { userId: Number(user.id) },
                        { productId: item.productId },
                        { variantId: item.variantId },
                        { sessionCart: item.sessionCartId },
                        { active: true },
                        { ordered: false },
                      ],
                    },
                    data: {
                      quantity: item.quantity,
                      sessionCart: cookiesObject.get("sessionCartId")?.value,
                    },
                  });
                })
              );
            }
          }
          token.sessionCartId = cookiesObject.get("sessionCartId")?.value;
        }
      }
      if (session?.user?.name && trigger === "update") {
        token.name = session.user.name;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
