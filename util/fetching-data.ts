import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { tr } from "zod/locales";

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
        variants: {
          select: {
            id: true,
            price: true,
            prevPrice: true,
          },
          where: {
            tag: "standard",
          },
        },
      },
    },
  },
  where: { status: true },
});

export const categoriesNameList = await prisma.categories.findMany({
  select: {
    name: true,
  },
});

export const brandsNameList = await prisma.brands.findMany({
  select: {
    name: true,
  },
});

export const currentProduct = (productId: number) => {
  return prisma.products.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      imgUrls: {
        select: {
          url: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      variants: {
        select: {
          id: true,
          color: true,
          stock: true,
          price: true,
          prevPrice: true,
          tag: true,
        },
      },
    },
  });
};
