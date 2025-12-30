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
        price: 10.99,
        description: "abc",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            { color: "#b0b0b0", stock: 10 },
            { color: "#4caf50", stock: 8 },
            { color: "#f29145", stock: 3 },
            { color: "#000000", stock: 1 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/monitor2_sgcl9n",
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
        price: 10.99,
        prevPrice: 15.99,
        description: "abc",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            { color: "#BD19A3", stock: 10 },
            { color: "#2F2F3F", stock: 0 },
            { color: "#3F3E2F", stock: 0 },
            { color: "#4CAF50", stock: 0 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/headphone1_htvor8",
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
        price: 13.99,
        prevPrice: 25.99,
        description: "abc",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            { color: "#16D7F3", stock: 10 },
            { color: "#16F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
            { color: "#F316E1", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/headphone2_dwhiyk",
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
        price: 13.99,
        prevPrice: 0,
        description: "abc",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            { color: "#16D7F3", stock: 10 },
            { color: "#16F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
            { color: "#F316E1", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/maus2_ycyh5h",
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
        price: 13.99,
        prevPrice: 0,
        description: "abc",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            { color: "#F35B16", stock: 10 },
            { color: "#D0F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/maus2_ycyh5h",
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
        name: "kayboard Razer xierra x16",
        price: 13.99,
        prevPrice: 0,
        description: "abc",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            { color: "#F35B16", stock: 10 },
            { color: "#D0F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/keyboard2_snct7q",
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
        price: 13.99,
        prevPrice: 100.0,
        description: "abc",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            { color: "#F35B16", stock: 0 },
            { color: "#D0F316", stock: 0 },
            { color: "#F3E916", stock: 0 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/kayboard1_qctlug",
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
        price: 13.99,
        prevPrice: 100.0,
        description: "abc",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "AOC"),
        variants: {
          create: [{ color: "#F35B16", stock: 1 }],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/monitor1_i1sr0m",
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
        price: 10.99,
        description: "abc",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            { color: "#b0b0b0", stock: 10 },
            { color: "#4caf50", stock: 8 },
            { color: "#f29145", stock: 3 },
            { color: "#000000", stock: 1 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/monitor2_sgcl9n",
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
        price: 10.99,
        prevPrice: 15.99,
        description: "abc",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            { color: "#BD19A3", stock: 10 },
            { color: "#2F2F3F", stock: 0 },
            { color: "#3F3E2F", stock: 0 },
            { color: "#4CAF50", stock: 0 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/headphone1_htvor8",
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
        price: 13.99,
        prevPrice: 25.99,
        description: "abc",
        categoryId: id(categories, "name", "Headphone"),
        brandId: id(brands, "name", "JBL"),
        variants: {
          create: [
            { color: "#16D7F3", stock: 10 },
            { color: "#16F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
            { color: "#F316E1", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/headphone2_dwhiyk",
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
        price: 13.99,
        prevPrice: 0,
        description: "abc",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "Logitech"),
        variants: {
          create: [
            { color: "#16D7F3", stock: 10 },
            { color: "#16F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
            { color: "#F316E1", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/maus2_ycyh5h",
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
        price: 13.99,
        prevPrice: 0,
        description: "abc",
        categoryId: id(categories, "name", "Mouse"),
        brandId: id(brands, "name", "ROG"),
        variants: {
          create: [
            { color: "#F35B16", stock: 10 },
            { color: "#D0F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/maus2_ycyh5h",
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
        price: 13.99,
        prevPrice: 0,
        description: "abc",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            { color: "#F35B16", stock: 10 },
            { color: "#D0F316", stock: 10 },
            { color: "#F3E916", stock: 10 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/keyboard2_snct7q",
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
        price: 13.99,
        prevPrice: 100.0,
        description: "abc",
        categoryId: id(categories, "name", "Keyboard"),
        brandId: id(brands, "name", "Razer"),
        variants: {
          create: [
            { color: "#F35B16", stock: 0 },
            { color: "#D0F316", stock: 0 },
            { color: "#F3E916", stock: 0 },
          ],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/kayboard1_qctlug",
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
        price: 13.99,
        prevPrice: 100.0,
        description: "abc",
        categoryId: id(categories, "name", "Monitor"),
        brandId: id(brands, "name", "AOC"),
        variants: {
          create: [{ color: "#F35B16", stock: 1 }],
        },
        imgUrls: {
          create: [
            {
              url: "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/c_limit,h_317,w_398/e_background_removal/b_rgb:BD1919/monitor1_i1sr0m",
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
