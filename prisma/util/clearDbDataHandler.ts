import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const clearDbDataHandler = async () => {
  try {
    await prisma.products.deleteMany();
    console.log("✅ Existing products deleted");
  } catch (e) {
    console.log("ℹ️  No products to delete (table may not exist yet)");
  }
  try {
    try {
      await prisma.brands.deleteMany();
      console.log("✅ Existing brands deleted");
    } catch (e) {
      console.log("ℹ️  No brands to delete (table may not exist yet)");
    }
    try {
      await prisma.carts.deleteMany();
      console.log("✅ Existing carts deleted");
    } catch (e) {
      console.log("ℹ️  No carts to delete (table may not exist yet)");
    }
    try {
      await prisma.users.deleteMany();
      console.log("✅ Existing users deleted");
    } catch (e) {
      console.log("ℹ️  No users to delete (table may not exist yet)");
    }
    try {
      await prisma.auth.deleteMany();
      console.log("✅ Existing auth deleted");
    } catch (e) {
      console.log("ℹ️  No auth to delete (table may not exist yet)");
    }
    try {
      await prisma.usersAddresses.deleteMany();
      console.log("✅ Existing users addresses deleted");
    } catch (e) {
      console.log("ℹ️  No users addresses to delete (table may not exist yet)");
    }
    try {
      await prisma.categoriesImgUrls.deleteMany();
      console.log("✅ Existing categories image URLs deleted");
    } catch (e) {
      console.log("ℹ️  No image URLs to delete (table may not exist yet)");
    }
    try {
      await prisma.brandsImgUrls.deleteMany();
      console.log("✅ Existing brands image URLs deleted");
    } catch (e) {
      console.log("ℹ️  No image URLs to delete (table may not exist yet)");
    }
    try {
      await prisma.productsImgUrls.deleteMany();
      console.log("✅ Existing products image URLs deleted");
    } catch (e) {
      console.log("ℹ️  No image URLs to delete (table may not exist yet)");
    }
    await prisma.categories.deleteMany();
    console.log("✅ Existing categories deleted");
  } catch (e) {
    console.log("ℹ️  No categories to delete (table may not exist yet)");
  }
};
