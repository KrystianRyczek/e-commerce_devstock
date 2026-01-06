import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export default async function createSlideShowHandler() {
  try {
    const mouse = await prisma.slideShow.create({
      data: {
        title: "Mouse",
        category: "Mouse",
        description:
          "High-performance gaming mouse for precision and speed. Ergonomic design with customizable buttons and RGB lighting.",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/e_background_removal:fineedges_y/mouse",
      },
    });
    const keyboard = await prisma.slideShow.create({
      data: {
        title: "Keyboard",
        category: "Keyboard",
        description:
          "Mechanical gaming keyboard with customizable RGB lighting, programmable keys, and durable build quality for an enhanced gaming experience.",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/a_90/e_upscale/e_background_removal:fineedges_y/keyboard",
      },
    });
    const monitor = await prisma.slideShow.create({
      data: {
        title: "Monitor",
        category: "Monitor",
        description:
          "High-resolution monitor with vibrant colors and fast refresh rate. Ideal for gaming and multimedia with multiple connectivity options.",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/e_background_removal:fineedges_y/monitor%20gaming",
      },
    });
    const headphone = await prisma.slideShow.create({
      data: {
        title: "Headphone",

        category: "Headphone",
        description:
          "Over-ear headphones with immersive sound quality, noise cancellation, and comfortable fit. Perfect for gaming and music listening.",
        imgUrl:
          "https://res.cloudinary.com/dts7qcxky/image/upload/e_upscale/e_background_removal:fineedges_y/headphone",
      },
    });

    console.log(`🎯 Created 4 Slide with images`);
  } catch (e) {
    console.log("💥 Failed to create brands! 💥");
    console.log("🔍 Error details:", e);
  }
  try {
    console.log("🔍 Fetching slides with image URLs...");
    const slidesWithImages = await prisma.slideShow.findMany({});
    console.log("📋 Slides with images:");
    slidesWithImages.forEach((slide) => {
      console.log(`   🏷️  ${slide.title} - ${slide.imgUrl || "No image"}`);
    });
  } catch (e) {
    console.log("💥 Failed to fetch brands after creation! 💥");
    console.log("🔍 Error details:", e);
  }
}
