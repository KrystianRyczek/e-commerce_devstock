import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { clearDbDataHandler } from "@/prisma/util/clearDbDataHandler";
import { createCategoryHandler } from "@/prisma/util/createCategoryHandler";
import { createBrandsHandler } from "@/prisma/util/createBrandsHandler";
import { createProductsHandler } from "@/prisma/util/crateProductsHandler";
import { createRecommendationHandler } from "@/prisma/util/createRecommendation";
import { createSlideShowHandler } from "./util/createSlideShowHandler";
import { createUserHandler } from "./util/createUserHandler";
import { createShippingMethodsHandler } from "./util/createShippingMethodsHandler";
import { createPaymentMethodsHandler } from "./util/createPaymentMethodsHandler";
import { createAddressesHandler } from "./util/createUserAddressesHandler";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");
  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log("🧹 Cleaning existing data...");
  await clearDbDataHandler();
  console.log("🚀 Database update started! 🚀");

  await createCategoryHandler();
  await createBrandsHandler();
  await createProductsHandler();
  await createRecommendationHandler();
  await createSlideShowHandler();
  await createUserHandler();
  await createShippingMethodsHandler();
  await createPaymentMethodsHandler();
  await createAddressesHandler();
}

main()
  .then(async () => {
    console.log("🎉 Database seed completed successfully! 🎉");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("💥💥 Fatal error during seeding: 💥💥", e);
    await prisma.$disconnect();
    process.exit(1);
  });
