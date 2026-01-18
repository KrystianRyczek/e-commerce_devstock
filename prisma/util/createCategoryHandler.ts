import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const createCategoryHandler = async () => {
  try {
    const mouseCategory = await prisma.categories.create({
      data: {
        name: "Mouse",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/mouse_nhm6kp",
          },
        },
      },
    });
    const monitorCategory = await prisma.categories.create({
      data: {
        name: "Monitor",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/monitor_ac6kfg",
          },
        },
      },
    });
    const headphoneCategory = await prisma.categories.create({
      data: {
        name: "Headphone",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/headphone_aq7pjm",
          },
        },
      },
    });
    const keyboardCategory = await prisma.categories.create({
      data: {
        name: "Keyboard",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/keyboard_gqzcnr",
          },
        },
      },
    });
    const webcamCategory = await prisma.categories.create({
      data: {
        name: "Webcam",
        imgUrl: {
          create: {
            url: "https://res.cloudinary.com/dts7qcxky/image/upload/camera_i6hkiw",
          },
        },
      },
    });
    console.log(`🎯 Created 5 categories with images`);
  } catch (e) {
    console.log("💥 Failed to create categories! 💥");
    console.log("🔍 Error details:", e);
  }
  // try {
  //   console.log("🔍 Fetching categories with image URLs...");
  //   const categoriesWithImages = await prisma.categories.findMany({
  //     include: {
  //       imgUrl: true,
  //     },
  //   });

  //   console.log("📋 Categories with images:");
  //   categoriesWithImages.forEach((category) => {
  //     console.log(
  //       `   📂 ${category.name} - ${category.imgUrl?.url || "No image"}`
  //     );
  //   });
  // } catch (e) {
  //   console.log("💥 Failed to fetch categories after creation! 💥");
  //   console.log("🔍 Error details:", e);
  // }
};
