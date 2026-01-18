import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashSync } from "bcrypt-ts-edge";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createPaymentMethodsHandler = async () => {
  try {
    const Visa = await prisma.paymentMethods.create({
      data: {
        name: "Visa",
        type: "card",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957175/Visa_hh1ghl.png",
      },
    });
    const MasterCard = await prisma.paymentMethods.create({
      data: {
        name: "MasterCard",
        type: "card",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957173/Mastercard_n6nwop.png",
      },
    });
    const PayPal = await prisma.paymentMethods.create({
      data: {
        name: "PayPal",
        type: "paypal",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957174/Paypal_bdj8rd.png",
      },
    });
    const ApplePay = await prisma.paymentMethods.create({
      data: {
        name: "Apple Pay",
        type: "apple_pay",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957171/APay_gz8grf.png",
      },
    });
    const GooglePay = await prisma.paymentMethods.create({
      data: {
        name: "Google Pay",
        type: "google_pay",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/v1766957172/GPay_acexoe.png",
      },
    });

    console.log(`🎯 Payment methods created successfully`);
  } catch (e) {
    console.log("💥 Failed to create Payment methods! 💥");
    console.log("🔍 Error details:", e);
  }
  try {
    console.log("🔍 Fetching created payment methods...");
    const paymentMethods = await prisma.paymentMethods.findMany({});
    console.log("📋 Payment Methods:");
    paymentMethods.forEach((method) => {
      console.log(`   🏷️  ${method.name} | ${method.imgUrl} |`);
    });
  } catch (e) {
    console.log("💥 Failed to fetch payment methods after creation! 💥");
    console.log("🔍 Error details:", e);
  }
};
