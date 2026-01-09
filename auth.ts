import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig, Session } from "next-auth";

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
        console.log("Authorize called with credentials:", credentials);
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
        console.log("User fetched from database:", user);
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
    async session({
      session,
      user,
      trigger,
      token,
    }: {
      session: Session;
      user: { id: string };
      trigger?: string;
      token: { sub?: string };
    }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "email@example.com",
//         },
//         phone: {
//           label: "Phone",
//           type: "text",
//           placeholder: "+(Code country) 9 digit",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Authorize called with credentials:", credentials);
//         if (credentials === null) {
//           return null;
//         }
//         const user = await prisma.users.findFirst({
//           where: {
//             OR: [
//               { email: credentials?.email || undefined },
//               { phone: credentials?.phone || undefined },
//             ],
//           },
//           select: {
//             id: true,
//             email: true,
//             role: true,
//             avatar: true,
//             password: true,
//             active: true,
//           },
//         });
//         console.log("User fetched from database:", user);
//         if (user && user.password) {
//           const isMatchingPassword = compareSync(
//             credentials?.password as string,
//             user.password
//           );
//           if (!isMatchingPassword) {
//             return null;
//           }
//           return {
//             id: user.id.toString(),
//             email: user.email,
//             role: user.role,
//             avatar: user.avatar,
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user && token.sub) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//   },
// });
