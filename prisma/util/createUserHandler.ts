import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashSync } from "bcrypt-ts-edge";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createUserHandler = async () => {
  try {
    const admin = await prisma.users.create({
      data: {
        email: process.env.ADMIN || "admin@admin.com",
        phone: process.env.PHONE || "+(48)123123123",
        role: "admin",
        active: true,
        password: hashSync(
          process.env.PASSWORD || "123",
          process.env.SALT ? parseInt(process.env.SALT) : 10
        ),
      },
    });
    const dummyUser = await prisma.users.create({
      data: {
        email: "dummy@user.com",
        phone: "+(48)123123123",
        role: "user",
        active: true,
        password: hashSync(
          "123",
          process.env.SALT ? parseInt(process.env.SALT) : 10
        ),
      },
    });
    console.log(`🎯 Users account and password created`);
  } catch (e) {
    console.log("💥 Failed to create Admin! 💥");
    console.log("🔍 Error details:", e);
  }
  // try {
  //   console.log("🔍 Fetching created user...");
  //   const users = await prisma.users.findMany({});
  //   console.log("📋 Users:");
  //   users.forEach((user) => {
  //     console.log(`   🏷️  ${user.email} | ${user.role} | ${user.phone} |`);
  //   });
  // } catch (e) {
  //   console.log("💥 Failed to fetch users after creation! 💥");
  //   console.log("🔍 Error details:", e);
  // }
};
