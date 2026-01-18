import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createAddressesHandler = async () => {
  try {
    const user = await prisma.users.findFirst({});
    const main = await prisma.usersAddresses.create({
      data: {
        name: "main",
        userId: user?.id!,
        main: true,
        address: "123 Main St",
        country: "USA",
        province: "NY",
        city: "New York",
        zip: 10001, // Assuming
      },
    });
    const work = await prisma.usersAddresses.create({
      data: {
        name: "work",
        userId: user?.id!,
        address: "456 Work Ave",
        country: "USA",
        province: "NY",
        city: "New York",
        zip: 133201, // Assuming
      },
    });
    const home = await prisma.usersAddresses.create({
      data: {
        name: "home",
        userId: user?.id!,
        address: "789 Home Blvd",
        country: "USA",
        province: "DC",
        city: "Washington",
        zip: 10022,
      },
    });

    console.log(`🎯 User addresses created successfully`);
  } catch (e) {
    console.log("💥 Failed to create User addresses! 💥");
    console.log("🔍 Error details:", e);
  }
  // try {
  //   console.log("🔍 Fetching created user addresses...");
  //   const userAddresses = await prisma.usersAddresses.findMany({});
  //   console.log("📋 User Addresses:");
  //   userAddresses.forEach((address) => {
  //     console.log(`   🏷️  ${address.name} | ${address.address} |`);
  //   });
  // } catch (e) {
  //   console.log("💥 Failed to fetch user addresses after creation! 💥");
  //   console.log("🔍 Error details:", e);
  // }
};
