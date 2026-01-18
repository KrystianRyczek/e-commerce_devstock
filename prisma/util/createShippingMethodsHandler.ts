import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createShippingMethodsHandler = async () => {
  try {
    const dhl = await prisma.shippingMethods.create({
      data: {
        name: "DHL",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957353/dhl_n817bf.png",
        price: 15.0,
      },
    });
    const inpost = await prisma.shippingMethods.create({
      data: {
        name: "InPost",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957355/inpost_cwsd6k.png",
        price: 62.0,
      },
    });
    const dpd = await prisma.shippingMethods.create({
      data: {
        name: "DPD",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957354/dpd_eh0xax.png",
        price: 45.0,
      },
    });

    console.log(`🎯 Shipping methods created successfully`);
  } catch (e) {
    console.log("💥 Failed to create Shipping methods! 💥");
    console.log("🔍 Error details:", e);
  }
  try {
    console.log("🔍 Fetching created shipping methods...");
    const shippingMethods = await prisma.shippingMethods.findMany({});
    console.log("📋 Shipping Methods:");
    shippingMethods.forEach((method) => {
      console.log(`   🏷️  ${method.name} | ${method.imgUrl} |`);
    });
  } catch (e) {
    console.log("💥 Failed to fetch shipping methods after creation! 💥");
    console.log("🔍 Error details:", e);
  }
};
