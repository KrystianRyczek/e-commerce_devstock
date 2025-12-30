import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createRecommendationHandler = async () => {
  try {
    const products = await prisma.products.findMany();
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 6);
    const recommendedProductIds = selectedProducts.map((product) => product.id);
    await prisma.recommendation.createMany({
      data: [
        { productId: recommendedProductIds[0], status: true },
        { productId: recommendedProductIds[1], status: true },
        { productId: recommendedProductIds[2], status: true },
        { productId: recommendedProductIds[3], status: true },
        { productId: recommendedProductIds[4], status: true },
        { productId: recommendedProductIds[5], status: true },
      ],
    });
  } catch (e) {
    console.log("💥 Failed to create recommended products! 💥");
    console.log("🔍 Error details:", e);
  }
  try {
    const recommendedProducts = await prisma.recommendation.findMany({
      where: { status: true },
      include: { product: true },
    });
    console.log("🔖 Recommended Products:");
    recommendedProducts.forEach((rec) => {
      console.log(`   🌟  ${rec.product.name}`);
    });
  } catch (e) {
    console.log("💥 Failed to fetch recommended products! 💥");
    console.log("🔍 Error details:", e);
  }
};
