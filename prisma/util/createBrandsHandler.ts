import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createBrandsHandler = async () => {
  try {
    const rog = await prisma.brands.create({
      data: {
        name: "ROG",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/rog_h81d2d",
          },
        },
      },
    });
    const logitech = await prisma.brands.create({
      data: {
        name: "Logitech",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/logitech_cbpk0x",
          },
        },
      },
    });
    const jbl = await prisma.brands.create({
      data: {
        name: "JBL",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/jbl_yp5wcx",
          },
        },
      },
    });
    const aoc = await prisma.brands.create({
      data: {
        name: "AOC",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/aoc_gwjakr",
          },
        },
      },
    });
    const razer = await prisma.brands.create({
      data: {
        name: "Razer",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/razer_oshngt",
          },
        },
      },
    });
    const rexus = await prisma.brands.create({
      data: {
        name: "Rexus",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/rexus_rhrq60",
          },
        },
      },
    });
    console.log(`🎯 Created 5 brands with images`);
  } catch (e) {
    console.log("💥 Failed to create brands! 💥");
    console.log("🔍 Error details:", e);
  }
  try {
    console.log("🔍 Fetching brands with image URLs...");
    const brandsWithImages = await prisma.brands.findMany({
      include: {
        imgUrl: true,
      },
    });
    console.log("📋 Brands with images:");
    brandsWithImages.forEach((brand) => {
      console.log(`   🏷️  ${brand.name} - ${brand.imgUrl?.url || "No image"}`);
    });
  } catch (e) {
    console.log("💥 Failed to fetch brands after creation! 💥");
    console.log("🔍 Error details:", e);
  }
};
