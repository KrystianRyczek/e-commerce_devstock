import { PrismaClient, Prisma } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { QueryParams } from "./types";
import { sortOptionArray } from "./static-data";
import { tr } from "zod/locales";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
export const userAvatar = async (userId: number) =>
  await prisma.users.findUnique({
    where: { id: userId },
    select: {
      avatar: true,
    },
  });
export const userItemsCartCount = async (userId: number) =>
  await prisma.cartItems.count({
    where: { AND: [{ userId: userId }, { active: true }] },
  });

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
export const productsArray = async () =>
  await prisma.products.findMany({
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
export const currentUser = async (id: number) =>
  await prisma.users.findMany({
    where: { id: id },
    select: {
      id: true,
      email: true,
      phone: true,
      role: true,
      avatar: true,
      active: true,
    },
  });
export const totalRecommendedCount = async (queryParams: QueryParams) =>
  await prisma.recommendation.count({
    where: {
      AND: [
        { status: true },
        {
          product: {
            category: {
              name: { in: queryParams.categories, mode: "insensitive" },
            },
            brand: { name: { in: queryParams.brands, mode: "insensitive" } },
            variants: {
              some: {
                tag: { equals: "standard", mode: "insensitive" },
                price: { gte: queryParams.min, lte: queryParams.max },
              },
            },
          },
        },
      ],
    },
  });

export const totalProductsCount = async (queryParams: QueryParams) => {
  if (queryParams.sort === "Recommended") {
    return await totalRecommendedCount(queryParams);
  }
  return await prisma.products.count({
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
};

export const products = async (queryParams: QueryParams) => {
  const sortparams = sortOptionArray.find(
    (option) => option.name === (queryParams.sort ?? "Default order")
  );

  let orderBy: { [key: string]: string } = {
    id: "asc",
  };
  if (
    sortparams?.filterName !== "recommended" &&
    !sortparams?.filterName.includes("price")
  ) {
    if (sortparams) {
      switch (sortparams.filterName) {
        case "name":
          orderBy = { name: sortparams.order };
          break;
        case "createdAt":
          orderBy = { id: sortparams.order };
          break;
        default:
          orderBy = { id: "asc" };
      }
    }
    return await prisma.products.findMany({
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
      orderBy,
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
  }
  if (sortparams?.filterName.includes("recommended")) {
    const recommended = await prisma.recommendation.findMany({
      skip: (queryParams.page - 1) * queryParams.show,
      take: queryParams.show,
      where: {
        AND: [
          { status: true },
          {
            product: {
              category: {
                name: { in: queryParams.categories, mode: "insensitive" },
              },
              brand: { name: { in: queryParams.brands, mode: "insensitive" } },
              variants: {
                some: {
                  tag: { equals: "standard", mode: "insensitive" },
                  price: { gte: queryParams.min, lte: queryParams.max },
                },
              },
            },
          },
        ],
      },
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
        },
      },
    });

    return recommended.map((recommendedProduct) => ({
      id: recommendedProduct.product.id,
      name: recommendedProduct.product.name,
      imgUrls: recommendedProduct.product.imgUrls,
      category: { name: recommendedProduct.product.category.name },
      brand: { name: recommendedProduct.product.brand.name },
      variants: recommendedProduct.product.variants,
    }));
  }
  if (sortparams?.filterName.includes("price")) {
    const productVariantsByPrice = await prisma.productVariants.findMany({
      skip: (queryParams.page - 1) * queryParams.show,
      take: queryParams.show,
      where: {
        AND: [
          {
            tag: { equals: "standard", mode: "insensitive" },
            price: {
              gte: queryParams.min,
              lte: queryParams.max,
            },
          },
          {
            productId: { not: null },
          },
          {
            product: {
              category: {
                name: { in: queryParams.categories, mode: "insensitive" },
              },
              brand: { name: { in: queryParams.brands, mode: "insensitive" } },
            },
          },
        ],
      },
      select: {
        price: true,
        prevPrice: true,
        id: true,
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
            brand: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        price: sortparams?.order as Prisma.SortOrder,
      },
    });

    return productVariantsByPrice.map((item) => ({
      id: item.product?.id || 0,
      name: item.product?.name || "",
      imgUrls: item.product?.imgUrls || [],
      category: { name: item.product?.category.name || "" },
      brand: { name: item.product?.brand.name || "" },
      variants: [
        {
          price: item.price,
          prevPrice: item.prevPrice,
          id: item.id,
        },
      ],
    }));
  }
};

export const cartItemsCountBySessionCart = async (sessionCartId: string) => {
  return await prisma.cartItems.count({
    where: {
      sessionCart: sessionCartId,
      active: true,
    },
  });
};

export const updateCartItemsBySessionCart = async (
  sessionCartId: string,
  userId: number
) => {
  return await prisma.cartItems.updateMany({
    where: {
      sessionCart: sessionCartId,
    },
    data: {
      userId: userId,
    },
  });
};

export const cartItemsBySessionCart = async (sessionCartId: string) => {
  const cartItems = await prisma.cartItems.findMany({
    where: {
      sessionCart: sessionCartId,
      active: true,
    },
    select: {
      sessionCart: true,
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
    productId: item.product?.id || 0,
    name: item.product?.name || "",
    sessionCartId: item.sessionCart || "",
    color:
      item.product?.variants.find((v) => v.id === item.variantId)?.color || "",
    imgUrls: item.product?.imgUrls[0] || { url: "" },
    category: item.product?.category.name || "",
    brand: item.product?.brand.name || "",
    price:
      item.product?.variants.find((v) => v.id === item.variantId)?.price || 0,
    quantity: item.quantity,
    stock:
      item.product?.variants.find((v) => v.id === item.variantId)?.stock || 0,
    variantId: item.variantId,
    selected: true,
    comment: "",
  }));
  return cartProductsArray;
};

export const cartItemsByUserAndNotSessionCartID = async (
  userId: number,
  sessionCartId: string
) => {
  const cartItems = await prisma.cartItems.findMany({
    where: {
      userId: userId,
      NOT: {
        sessionCart: sessionCartId,
      },
      active: true,
    },
    orderBy: {
      id: "desc",
    },
    select: {
      sessionCart: true,
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
    productId: item.product?.id || 0,
    name: item.product?.name || "",
    sessionCartId: item.sessionCart || "",
    color:
      item.product?.variants.find((v) => v.id === item.variantId)?.color || "",
    imgUrls: item.product?.imgUrls[0] || { url: "" },
    category: item.product?.category.name || "",
    price:
      item.product?.variants.find((v) => v.id === item.variantId)?.price || 0,
    quantity: item.quantity,
    stock:
      item.product?.variants.find((v) => v.id === item.variantId)?.stock || 0,
    variantId: item.variantId,
    selected: true,
    comment: "",
  }));
  return cartProductsArray;
};

export const cartByUser = async (userId: number) => {
  return await prisma.cartItems.findMany({
    where: {
      userId: userId,
      active: true,
    },
    select: {
      sessionCart: true,
    },
  });
};
export const cartItemsByUser = async (userId: number) => {
  const cartItems = await prisma.cartItems.findMany({
    where: {
      userId: userId,
      active: true,
    },
    select: {
      sessionCart: true,
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
    productId: item.product?.id || 0,
    name: item.product?.name || "",
    sessionCartId: item.sessionCart || "",
    color:
      item.product?.variants.find((v) => v.id === item.variantId)?.color || "",
    imgUrls: item.product?.imgUrls[0] || { url: "" },
    category: item.product?.category.name || "",
    brand: item.product?.brand.name || "",
    price:
      item.product?.variants.find((v) => v.id === item.variantId)?.price || 0,
    quantity: item.quantity,
    stock:
      item.product?.variants.find((v) => v.id === item.variantId)?.stock || 0,
    selected: true,
    comment: "",
    variantId: item.variantId,
  }));
  return cartProductsArray;
};
export const slidesShow = await prisma.slideShow.findMany({
  select: {
    title: true,
    category: true,
    description: true,
    imgUrl: true,
  },
});
export const paymentMethods = await prisma.paymentMethods.findMany({
  select: {
    id: true,
    name: true,
    type: true,
    imgUrl: true,
  },
});
export const shippingMethods = await prisma.shippingMethods.findMany({
  select: {
    id: true,
    name: true,
    imgUrl: true,
    price: true,
  },
});
export const addressesByUser = async (userId: number) => {
  return await prisma.usersAddresses.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      main: true,
      address: true,
      country: true,
      province: true,
      city: true,
      zip: true,
    },
  });
};
export const ordersByUser = async (userId: number) => {
  return await prisma.orders.findMany({
    where: { userId: userId, paymentStatus: null },
    select: {
      id: true,
      paymentMethod: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
      paymentStatus: true,
      createdAt: true,
      updatedAt: true,
      orderedProducts: {
        select: {
          productId: true,
          productName: true,
          variantId: true,
          quantity: true,
          price: true,
          color: true,
          img: true,
          protection: true,
          comment: true,
          brand: true,
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};
export const ordersByUserWithProductsId = async (userId: number) => {
  return await prisma.orders.findMany({
    where: { userId: userId, paymentStatus: { not: null } },
    select: {
      id: true,
      paymentStatus: true,
      createdAt: true,
      orderedProducts: {
        select: {
          productId: true,
          productName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const ordersByIds = async (ordersId: number[]) => {
  return await prisma.orders.findMany({
    where: { id: { in: ordersId } },
    select: {
      id: true,
      paymentMethod: {
        select: { name: true },
      },
      shippingMethod: {
        select: { name: true, price: true },
      },
      createdAt: true,
      paymentStatus: true,
      totalPrice: true,
      updatedAt: true,
      orderedProducts: {
        select: {
          productName: true,
          quantity: true,
          protection: true,
          price: true,
        },
      },
    },
  });
};

export const getTotalPriceById = async (ordersId: string[], userId: number) => {
  const ordersIdNum = ordersId.map((id) => Number(id));
  const orders = await prisma.orders.findMany({
    where: {
      id: { in: ordersIdNum },
      userId: userId,
      paymentStatus: "pending",
    },
    select: {
      totalPrice: true,
      id: true,
      shippingMethod: {
        select: {
          price: true,
        },
      },
    },
  });
  const shippingPrices = 0;

  let totalPrice =shippingPrices||0;
  orders.forEach((order) => {
    totalPrice += order.totalPrice ? order.totalPrice : 0;
  });
  return totalPrice;
  

};
