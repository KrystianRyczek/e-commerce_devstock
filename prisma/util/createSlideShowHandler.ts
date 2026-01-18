import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
export const createSlideShowHandler = async () => {
  try {
    const mouse = await prisma.slideShow.create({
      data: {
        title: "Mouse",
        category: "Mouse",
        description:
          "High-performance gaming mouse for precision and speed. Ergonomic design with customizable buttons and RGB lighting.",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/e_background_removal:fineedges_y,c_fit,h_852,w_422/mouse",
      },
    });
    const keyboard = await prisma.slideShow.create({
      data: {
        title: "Keyboard",
        category: "Keyboard",
        description:
          "Mechanical gaming keyboard with customizable RGB lighting, programmable keys, and durable build quality for an enhanced gaming experience.",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/c_crop,g_face,h_422,w_852/a_90/keyboard",
      },
    });
    const headphone = await prisma.slideShow.create({
      data: {
        title: "Headphone",

        category: "Headphone",
        description:
          "Over-ear headphones with immersive sound quality, noise cancellation, and comfortable fit. Perfect for gaming and music listening.",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/ar_1.0,c_scale,h_852/c_crop,g_east,h_852,w_422/headphone",
      },
    });

    console.log(`🎯 Created 4 Slide with images`);
  } catch (e) {
    console.log("💥 Failed to create brands! 💥");
    console.log("🔍 Error details:", e);
  }
  // try {
  //   console.log("🔍 Fetching slides with image URLs...");
  //   const slidesWithImages = await prisma.slideShow.findMany({});
  //   console.log("📋 Slides with images:");
  //   slidesWithImages.forEach((slide) => {
  //     console.log(`   🏷️  ${slide.title} - ${slide.imgUrl || "No image"}`);
  //   });
  // } catch (e) {
  //   console.log("💥 Failed to fetch brands after creation! 💥");
  //   console.log("🔍 Error details:", e);
  // }
};
