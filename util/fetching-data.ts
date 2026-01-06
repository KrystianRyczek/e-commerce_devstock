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
export const cartItemsBySessionCart = async (sessionCartId: string) => {
  const cartItems = await prisma.cartItems.findMany({
    where: {
      sesionCart: sessionCartId,
    },
    select: {
      sesionCart: true,
      quantity: true,
      variantId: true,
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
          variants: {
            select: {
              id: true,
              price: true,
              stock: true,
              color: true,
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
        },
      },
    },
  });

  if (cartItems.length === 0) {
    return [];
  }
  const cartProductsArray = cartItems.map((item) => ({
    id: item.product?.id || 0,
    name: item.product?.name || "",
    color:
      item.product?.variants.find((v) => v.id === item.variantId)?.color || "",
    imgUrls: item.product?.imgUrls[0] || { url: "" },
    category: item.product?.category.name || "",
    price:
      item.product?.variants.find((v) => v.id === item.variantId)?.price || 0,
    quantity: item.quantity,
    stock:
      item.product?.variants.find((v) => v.id === item.variantId)?.stock || 0,
    selected: true,
    comment: "",
  }));
  return cartProductsArray;
};
export const cartItemsByUser = async (userId: number) => {
  return await prisma.cartItems.findFirst({
    where: {
      userId: userId,
    },
  });
};
export const slidesShow = await prisma.slideShow.findMany({
  select: {
    title: true,
    category: true,
    description: true,
    imgUrl: true,
  },
});
