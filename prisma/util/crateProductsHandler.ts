import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createProductsHandler = async () => {
  try {
    const brands = await prisma.brands.findMany();
    const categories = await prisma.categories.findMany();

    const id = (
      array: { id: number; name: string }[],
      name: string,
      value: string
    ): number => {
      return (
        array.find(
          (item: { [key: string]: number | string }) =>
            item[name].toString().toLowerCase() === value.toLowerCase()
        )?.id || 0
      );
    };
    const product1 = await prisma.products.create({
      data: {
        name: "Monitor Pro X24",
        description:
          "The Monitor Pro X24 offers stunning visuals with its 24-inch display, delivering vibrant colors and sharp details. Perfect for both work and entertainment, it features multiple connectivity options and ergonomic design for comfortable viewing.",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            {
              color: "#b0b0b0",
              stock: 10,
              price: 10.99,
              prevPrice: 12.99,
              tag: "standard",
            },
            {
              color: "#4caf50",
              stock: 8,
              price: 11.99,
              prevPrice: 13.99,
              tag: "",
            },
            {
              color: "#f29145",
              stock: 3,
              price: 12.99,
              prevPrice: 14.99,
              tag: "",
            },
            {
              color: "#000000",
              stock: 1,
              price: 13.99,
              prevPrice: 15.99,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/monitor2_sgcl9n",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/monitor2_sgcl9n",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/monitor2_sgcl9n",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/monitor2_sgcl9n",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product2 = await prisma.products.create({
      data: {
        name: "Headphone JBL Xtreme",
        description:
          "The JBL Xtreme is a powerful portable Bluetooth speaker that delivers exceptional sound quality and deep bass. Its rugged design is waterproof and dustproof, making it perfect for outdoor adventures.",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            {
              color: "#BD19A3",
              stock: 10,
              price: 11.99,
              prevPrice: 12.99,
              tag: "standard",
            },
            {
              color: "#2F2F3F",
              stock: 0,
              price: 11.99,
              prevPrice: 13.99,
              tag: "",
            },
            {
              color: "#3F3E2F",
              stock: 0,
              price: 12.99,
              prevPrice: 14.99,
              tag: "",
            },
            {
              color: "#4CAF50",
              stock: 0,
              price: 13.99,
              prevPrice: 15.99,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/headphone1_htvor8",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/headphone1_htvor8",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/headphone1_htvor8",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/headphone1_htvor8",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product3 = await prisma.products.create({
      data: {
        name: "Headphone JBL Charge 5",
        description:
          "The JBL Charge 5 is a powerful portable Bluetooth speaker that delivers exceptional sound quality and deep bass. Its rugged design is waterproof and dustproof, making it perfect for outdoor adventures.",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            {
              color: "#16D7F3",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "standard",
            },
            {
              color: "#16F316",
              stock: 10,
              price: 15.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 16.99,
              prevPrice: 18.99,
              tag: "",
            },
            {
              color: "#F316E1",
              stock: 10,
              price: 17.99,
              prevPrice: 0,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/headphone2_dwhiyk",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/headphone2_dwhiyk",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/headphone2_dwhiyk",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/headphone2_dwhiyk",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product4 = await prisma.products.create({
      data: {
        name: "Mause Logitech G502 Hero",
        description:
          "Logitech G502 Hero mouse is a cutting-edge peripheral that combines precision and comfort. Its ergonomic design fits snugly in your hand, while its high-precision sensor ensures smooth and accurate ",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            {
              color: "#16D7F3",
              stock: 10,
              price: 13.99,
              prevPrice: 0,
              tag: "standard",
            },
            {
              color: "#16F316",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 15.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F316E1",
              stock: 10,
              price: 16.99,
              prevPrice: 0,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/maus2_ycyh5h",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/maus2_ycyh5h",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/maus2_ycyh5h",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/maus2_ycyh5h",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product5 = await prisma.products.create({
      data: {
        name: "Mause Razer xierra x16",
        description:
          "The Xierra X16 mouse is a cutting-edge peripheral that combines precision and comfort. Its ergonomic design fits snugly in your hand, while its high-precision sensor ensures smooth and accurate ",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 10,
              price: 13.99,
              prevPrice: 0,
              tag: "standard",
            },
            {
              color: "#D0F316",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 15.99,
              prevPrice: 0,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/maus2_ycyh5h",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/maus2_ycyh5h",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/maus2_ycyh5h",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/maus2_ycyh5h",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product6 = await prisma.products.create({
      data: {
        name: "Keyboard Razer xierra x16",
        description:
          "The Keyboard Xierra X16 offers a seamless typing experience with its responsive keys and customizable RGB lighting. Designed for both gamers and professionals, it features durable construction and programmable macros to enhance productivity and gameplay.",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 10,
              price: 13.99,
              prevPrice: 15.99,
              tag: "standard",
            },
            {
              color: "#D0F316",
              stock: 10,
              price: 15.99,
              prevPrice: 20.99,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 20.99,
              prevPrice: 30.99,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/keyboard2_snct7q",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/keyboard2_snct7q",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/keyboard2_snct7q",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/keyboard2_snct7q",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product7 = await prisma.products.create({
      data: {
        name: "Keyboard Razer xierra x16",
        description:
          "The Keyboard Xierra X16 offers a seamless typing experience with its responsive keys and customizable RGB lighting. Designed for both gamers and professionals, it features durable construction and programmable macros to enhance productivity and gameplay.",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 0,
              price: 13.99,
              prevPrice: 15.99,
              tag: "standard",
            },
            {
              color: "#D0F316",
              stock: 0,
              price: 15.99,
              prevPrice: 20.99,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 0,
              price: 20.99,
              prevPrice: 30.99,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/kayboard1_qctlug",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/kayboard1_qctlug",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/kayboard1_qctlug",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/kayboard1_qctlug",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product8 = await prisma.products.create({
      data: {
        name: "Monitor AOC 24G2E",
        description:
          "The AOC 24G2E monitor delivers stunning visuals with its 24-inch Full HD display, featuring vibrant colors and sharp details. Ideal for gaming and productivity, it offers a fast refresh rate, low response time, and multiple connectivity options.",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "AOC"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 1,
              price: 13.99,
              prevPrice: 0,
              tag: "standard",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/monitor1_i1sr0m",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/monitor1_i1sr0m",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/monitor1_i1sr0m",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/monitor1_i1sr0m",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product9 = await prisma.products.create({
      data: {
        name: "Monitor Pro X24",
        description:
          "The Monitor Pro X24 offers stunning visuals with its 24-inch display, delivering vibrant colors and sharp details. Perfect for both work and entertainment, it features multiple connectivity options and ergonomic design for comfortable viewing.",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            {
              color: "#b0b0b0",
              stock: 10,
              price: 13.99,
              prevPrice: 15.99,
              tag: "standard",
            },
            { color: "#4caf50", stock: 8, price: 11.99, prevPrice: 0, tag: "" },
            { color: "#f29145", stock: 3, price: 13.99, prevPrice: 0, tag: "" },
            { color: "#000000", stock: 1, price: 18.99, prevPrice: 0, tag: "" },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/monitor2_sgcl9n",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/monitor2_sgcl9n",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/monitor2_sgcl9n",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/monitor2_sgcl9n",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product10 = await prisma.products.create({
      data: {
        name: "Headphone JBL Xtreme",
        description:
          "The JBL Xtreme headphones deliver powerful sound with deep bass and clear highs. Designed for on-the-go use, they feature a comfortable fit, long battery life, and water-resistant construction for durability.",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            {
              color: "#BD19A3",
              stock: 10,
              price: 11.99,
              prevPrice: 12.99,
              tag: "standard",
            },
            {
              color: "#2F2F3F",
              stock: 0,
              price: 11.99,
              prevPrice: 13.99,
              tag: "",
            },
            {
              color: "#3F3E2F",
              stock: 0,
              price: 12.99,
              prevPrice: 14.99,
              tag: "",
            },
            { color: "#4CAF50", stock: 0, price: 13.99, prevPrice: 0, tag: "" },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/headphone1_htvor8",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/headphone1_htvor8",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/headphone1_htvor8",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/headphone1_htvor8",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product11 = await prisma.products.create({
      data: {
        name: "Headphone JBL Charge 5",
        description:
          "The JBL Charge 5 headphones offer powerful sound with deep bass and clear highs. Designed for durability and portability, they feature a long-lasting battery, water-resistant construction, and a comfortable fit for extended use.",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            {
              color: "#16D7F3",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "standard",
            },
            {
              color: "#16F316",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F316E1",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/headphone2_dwhiyk",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/headphone2_dwhiyk",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/headphone2_dwhiyk",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/headphone2_dwhiyk",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product12 = await prisma.products.create({
      data: {
        name: "Mause Logitech G502 Hero",
        description:
          "Logitech G502 Hero mouse is a cutting-edge peripheral that combines precision and comfort. Its ergonomic design fits snugly in your hand, while its high-precision sensor ensures smooth and accurate ",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            {
              color: "#16D7F3",
              stock: 10,
              price: 19.99,
              prevPrice: 0,
              tag: "standard",
            },
            {
              color: "#16F316",
              stock: 10,
              price: 13.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F316E1",
              stock: 10,
              price: 11.99,
              prevPrice: 0,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/maus2_ycyh5h",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/maus2_ycyh5h",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/maus2_ycyh5h",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/maus2_ycyh5h",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product13 = await prisma.products.create({
      data: {
        name: "Mouse ROG xierra x16",
        description:
          "The ROG Xierra X16 mouse combines precision and comfort with its ergonomic design and high-precision sensor, ensuring smooth and accurate tracking for gamers and professionals alike.",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "ROG"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 10,
              price: 19.99,
              prevPrice: 50.99,
              tag: "standard",
            },
            {
              color: "#D0F316",
              stock: 10,
              price: 13.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/maus2_ycyh5h",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/maus2_ycyh5h",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/maus2_ycyh5h",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/maus2_ycyh5h",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product14 = await prisma.products.create({
      data: {
        name: "Keyboard Razer xierra x16",
        description:
          "The Keyboard Xierra X16 offers a seamless typing experience with its responsive keys and customizable RGB lighting. Designed for both gamers and professionals, it features durable construction and programmable macros to enhance productivity and gameplay.",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 10,
              price: 19.99,
              prevPrice: 50.99,
              tag: "standard",
            },
            {
              color: "#D0F316",
              stock: 10,
              price: 13.99,
              prevPrice: 0,
              tag: "",
            },
            {
              color: "#F3E916",
              stock: 10,
              price: 14.99,
              prevPrice: 0,
              tag: "",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/keyboard2_snct7q",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/keyboard2_snct7q",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/keyboard2_snct7q",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/keyboard2_snct7q",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product15 = await prisma.products.create({
      data: {
        name: "Keyboard Razer xierra x16",
        description:
          "The Keyboard Xierra X16 offers a seamless typing experience with its responsive keys and customizable RGB lighting. Designed for both gamers and professionals, it features durable construction and programmable macros to enhance productivity and gameplay.",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 0,
              price: 9.99,
              prevPrice: 10.99,
              tag: "standard",
            },
            { color: "#D0F316", stock: 0, price: 13.99, prevPrice: 0, tag: "" },
            { color: "#F3E916", stock: 0, price: 14.99, prevPrice: 0, tag: "" },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/kayboard1_qctlug",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/kayboard1_qctlug",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/kayboard1_qctlug",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/kayboard1_qctlug",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    const product16 = await prisma.products.create({
      data: {
        name: "Monitor AOC 24G2E",
        description:
          "The AOC 24G2E monitor delivers stunning visuals with its 24-inch Full HD display, featuring vibrant colors and sharp details. Ideal for gaming and productivity, it offers a fast refresh rate, low response time, and multiple connectivity options.",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "AOC"),
        variants: {
          create: [
            {
              color: "#F35B16",
              stock: 1,
              price: 9.99,
              prevPrice: 10.99,
              tag: "standard",
            },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:e7e7e7/monitor1_i1sr0m",
              tag: "gallery0",
              main: true,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:2319BD/monitor1_i1sr0m",
              tag: "gallery1",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BDAE19/monitor1_i1sr0m",
              tag: "gallery2",
              main: false,
            },
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD19A3/monitor1_i1sr0m",
              tag: "gallery3",
              main: false,
            },
          ],
        },
      },
    });
    console.log("🎯 Created 16 products with variants and images!");
  } catch (e) {
    console.log("💥 Failed to create products! 💥");
    console.log("🔍 Error details:", e);
  }

  try {
    const products = await prisma.products.findMany({
      include: {
        imgUrls: true,
        variants: true,
        category: true,
        brand: true,
      },
    });
    console.log("📋 Products list with variants and images:");
    products.forEach((product) => {
      console.log(
        `🏷️  ${product.name} | ${product.category.name} | ${
          product.brand.name
        }  \n- ImgURLs:\n   ${
          product.imgUrls
            ?.map(
              (img) =>
                img.url + "; tag: " + img.tag + (img.main ? " (main)" : "")
            )
            .join(",\n   ") || "No image"
        } \n-Variants:\n   ${
          product.variants
            ?.map(
              (variant) =>
                "Color: " + variant.color + " (stock: " + variant.stock + ")"
            )
            .join(",\n   ") || "No variants"
        }`
      );
    });
  } catch (e) {
    console.log("💥 Failed to fetch products after creation! 💥");
    console.log("🔍 Error details:", e);
  }
};
