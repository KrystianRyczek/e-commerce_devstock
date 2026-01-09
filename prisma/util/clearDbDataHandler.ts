import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export const clearDbDataHandler = async () => {
  try {
    await prisma.cartItems.deleteMany();
    console.log("✅ Existing carts deleted");
  } catch (e) {
    console.log("ℹ️  No carts to delete (table may not exist yet)");
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
    await prisma.account.deleteMany();
    console.log("✅ Existing accounts deleted");
  } catch (e) {
    console.log("ℹ️  No accounts to delete (table may not exist yet)");
    console.log("🔍 Error details:", e);
  }
  try {
    await prisma.session.deleteMany();
    console.log("✅ Existing session deleted");
  } catch (e) {
    console.log("ℹ️  No session to delete (table may not exist yet)");
    console.log("🔍 Error details:", e);
  }
  try {
    await prisma.verificationToken.deleteMany();
    console.log("✅ Existing verification tokens deleted");
  } catch (e) {
    console.log(
      "ℹ️  No verification tokens to delete (table may not exist yet)"
    );
    console.log("🔍 Error details:", e);
  }
  try {
    await prisma.slideShow.deleteMany();
    console.log("✅ Existing slide shows deleted");
  } catch (e) {
    console.log("ℹ️  No slide shows to delete (table may not exist yet)");
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
    await prisma.recommendation.deleteMany();
    console.log("✅ Existing recommendations deleted");
  } catch (e) {
    console.log("ℹ️  No recommendations to delete (table may not exist yet)");
  }
  try {
    await prisma.productsImgUrls.deleteMany();
    console.log("✅ Existing products image URLs deleted");
  } catch (e) {
    console.log("ℹ️  No image URLs to delete (table may not exist yet)");
  }
  try {
    await prisma.products.deleteMany();
    console.log("✅ Existing products deleted");
  } catch (e) {
    console.log("ℹ️  No products to delete (table may not exist yet)");
  }
  try {
    await prisma.brandsImgUrls.deleteMany();
    console.log("✅ Existing brands image URLs deleted");
  } catch (e) {
    console.log("ℹ️  No image URLs to delete (table may not exist yet)");
  }
  try {
    await prisma.brands.deleteMany();
    console.log("✅ Existing brands deleted");
  } catch (e) {
    console.log("ℹ️  No brands to delete (table may not exist yet)");
  }
  try {
    await prisma.categoriesImgUrls.deleteMany();
    console.log("✅ Existing categories image URLs deleted");
  } catch (e) {
    console.log("ℹ️  No image URLs to delete (table may not exist yet)");
  }
  try {
    await prisma.categories.deleteMany();
    console.log("✅ Existing categories deleted");
  } catch (e) {
    console.log("ℹ️  No categories to delete (table may not exist yet)");
    console.log("🔍 Error details:", e);
  }
  try {
    await prisma.paymentMethods.deleteMany();
    console.log("✅ Existing payment methods deleted");
  } catch (e) {
    console.log("ℹ️  No payment methods to delete (table may not exist yet)");
    console.log("🔍 Error details:", e);
  }
};
