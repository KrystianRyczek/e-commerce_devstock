import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { tr } from "zod/locales";
import { QueryParams } from "./types";

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
            tag: { equals: "standard", mode: "insensitive" },
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

export const currentProduct = async (productId: number) =>
  await prisma.products.findUnique({
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
export const totalProductsCount = async (queryParams: QueryParams) =>
  await prisma.products.count({
    where: {
      AND: [
        {
          category: {
            name: { in: queryParams.categories, mode: "insensitive" },
          },
        },
        { brand: { name: { in: queryParams.brands, mode: "insensitive" } } },
        {
          variants: {
            some: {
              tag: { equals: "standard", mode: "insensitive" },
              price: { gte: queryParams.min, lte: queryParams.max },
            },
          },
        },
      ],
    },
  });

export const products = async (
  queryParams: QueryParams,
  filterName: string = "id",
  order: "asc" | "desc" = "asc"
) =>
  await prisma.products.findMany({
    skip: (queryParams.page - 1) * queryParams.show,
    take: queryParams.show,
    where: {
      AND: [
        {
          category: {
            name: { in: queryParams.categories, mode: "insensitive" },
          },
        },
        { brand: { name: { in: queryParams.brands, mode: "insensitive" } } },
        {
          variants: {
            some: {
              tag: { equals: "standard", mode: "insensitive" },
              price: { gte: queryParams.min, lte: queryParams.max },
            },
          },
        },
      ],
    },
    orderBy: {
      [filterName]: order,
    },
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
      brand: {
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
          tag: { equals: "standard", mode: "insensitive" },
        },
      },
    },
  });
