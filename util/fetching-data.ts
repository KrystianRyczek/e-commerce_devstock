import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const brandsWithImages = await prisma.brands.findMany({
  select: {
    id: true,
    name: true,
    imgUrl: {
      select: {
        url: true,
      },
    },
  },
});

export const categoriesWithImages = await prisma.categories.findMany({
  select: {
    id: true,
    name: true,
    imgUrl: {
      select: {
        url: true,
      },
    },
  },
});
export const recommendedProducts = await prisma.recommendation.findMany({
  select: {
    product: {
      select: {
        id: true,
        name: true,
        price: true,
        prevPrice: true,
        imgUrls: {
          select: {
            url: true,
          },
          where: {
            main: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    },
  },
  where: { status: true },
});
