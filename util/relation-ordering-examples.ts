// import { PrismaClient, Prisma } from "@/prisma/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });
// const prisma = new PrismaClient({ adapter });

// /**
//  * PRISMA ORDER BY RELATION PATTERNS FOR ONE-TO-MANY
//  *
//  * This file demonstrates various ways to order by relations in Prisma
//  * using your e-commerce schema as examples.
//  */

// // ========================================================================
// // 1. SIMPLE RELATION ORDERING (One-to-One or Many-to-One)
// // ========================================================================

// // Order products by brand name (Many Products -> One Brand)
// export const productsByBrandName = async () => {
//   return await prisma.products.findMany({
//     orderBy: {
//       brand: {
//         name: "asc", // Order by the related brand's name
//       },
//     },
//     select: {
//       id: true,
//       name: true,
//       brand: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
// };

// // Order products by category name
// export const productsByCategoryName = async () => {
//   return await prisma.products.findMany({
//     orderBy: {
//       category: {
//         name: "desc", // Order by the related category's name
//       },
//     },
//   });
// };

// // ========================================================================
// // 2. MULTIPLE ORDERBY WITH RELATIONS
// // ========================================================================

// // Order by category first, then by brand, then by product name
// export const productsMultipleOrder = async () => {
//   return await prisma.products.findMany({
//     orderBy: [
//       {
//         category: {
//           name: "asc",
//         },
//       },
//       {
//         brand: {
//           name: "asc",
//         },
//       },
//       {
//         name: "asc",
//       },
//     ],
//   });
// };

// // ========================================================================
// // 3. AGGREGATE ORDERING (One-to-Many relations)
// // ========================================================================

// // Order products by count of variants (One Product -> Many Variants)
// export const productsByVariantCount = async () => {
//   return await prisma.products.findMany({
//     orderBy: {
//       variants: {
//         _count: "desc", // Order by how many variants each product has
//       },
//     },
//     select: {
//       id: true,
//       name: true,
//       _count: {
//         select: {
//           variants: true, // Include the count in results
//         },
//       },
//     },
//   });
// };

// // Order products by count of images
// export const productsByImageCount = async () => {
//   return await prisma.products.findMany({
//     orderBy: {
//       imgUrls: {
//         _count: "desc",
//       },
//     },
//   });
// };

// // Order categories by count of products
// export const categoriesByProductCount = async () => {
//   return await prisma.categories.findMany({
//     orderBy: {
//       products: {
//         _count: "desc",
//       },
//     },
//     select: {
//       id: true,
//       name: true,
//       _count: {
//         select: {
//           products: true,
//         },
//       },
//     },
//   });
// };

// // ========================================================================
// // 4. ADVANCED: ORDERING BY AGGREGATED VALUES
// // ========================================================================

// // For more complex aggregations, you need raw SQL or multiple queries
// export const productsByAverageVariantPrice = async () => {
//   // Method 1: Using raw SQL
//   const result = await prisma.$queryRaw`
//     SELECT
//       p.id,
//       p.name,
//       AVG(pv.price) as avg_price,
//       COUNT(pv.id) as variant_count
//     FROM "Products" p
//     LEFT JOIN "ProductVariants" pv ON p.id = pv."productId"
//     WHERE pv.tag = 'standard'
//     GROUP BY p.id, p.name
//     ORDER BY avg_price DESC
//     LIMIT 10
//   `;

//   return result;
// };

// export const productsByMinVariantPrice = async () => {
//   // Method 2: Using raw SQL for MIN price ordering
//   const result = await prisma.$queryRaw`
//     SELECT
//       p.id,
//       p.name,
//       MIN(pv.price) as min_price,
//       c.name as category_name,
//       b.name as brand_name
//     FROM "Products" p
//     LEFT JOIN "ProductVariants" pv ON p.id = pv."productId"
//     LEFT JOIN "Categories" c ON p."categoryId" = c.id
//     LEFT JOIN "Brands" b ON p."brandId" = b.id
//     WHERE pv.tag = 'standard'
//     GROUP BY p.id, p.name, c.name, b.name
//     ORDER BY min_price ASC
//   `;

//   return result;
// };

// // ========================================================================
// // 5. ORDERING THROUGH NESTED RELATIONS
// // ========================================================================

// // Order cart items by product's brand name (CartItems -> Product -> Brand)
// export const cartItemsByProductBrand = async (sessionCartId: string) => {
//   return await prisma.cartItems.findMany({
//     where: {
//       sesionCart: sessionCartId,
//       active: true,
//     },
//     orderBy: {
//       product: {
//         brand: {
//           name: "asc", // Order by the product's brand name
//         },
//       },
//     },
//   });
// };

// // Order cart items by product creation date
// export const cartItemsByProductAge = async (sessionCartId: string) => {
//   return await prisma.cartItems.findMany({
//     where: {
//       sesionCart: sessionCartId,
//       active: true,
//     },
//     orderBy: {
//       product: {
//         createdAt: "desc", // Newest products first
//       },
//     },
//   });
// };

// // ========================================================================
// // 6. ORDERING RELATIONS WITHIN SELECT
// // ========================================================================

// // Get products with variants ordered by price within each product
// export const productsWithOrderedVariants = async () => {
//   return await prisma.products.findMany({
//     orderBy: {
//       name: "asc",
//     },
//     select: {
//       id: true,
//       name: true,
//       variants: {
//         orderBy: {
//           price: "asc", // Order variants by price within each product
//         },
//         select: {
//           id: true,
//           color: true,
//           price: true,
//           stock: true,
//         },
//       },
//       imgUrls: {
//         orderBy: {
//           main: "desc", // Main images first
//         },
//         select: {
//           url: true,
//           main: true,
//         },
//       },
//     },
//   });
// };

// // ========================================================================
// // 7. COMPLEX FILTERING + ORDERING WITH RELATIONS
// // ========================================================================

// export const complexProductQuery = async (
//   categoryNames: string[],
//   brandNames: string[],
//   minPrice: number,
//   maxPrice: number,
//   sortBy: "name" | "brand" | "category" | "price" | "variantCount" = "name",
//   sortOrder: "asc" | "desc" = "asc"
// ) => {
//   let orderBy: Prisma.ProductsOrderByWithRelationInput = {};

//   switch (sortBy) {
//     case "name":
//       orderBy = { name: sortOrder };
//       break;
//     case "brand":
//       orderBy = { brand: { name: sortOrder } };
//       break;
//     case "category":
//       orderBy = { category: { name: sortOrder } };
//       break;
//     case "variantCount":
//       orderBy = { variants: { _count: sortOrder } };
//       break;
//     case "price":
//       // For price, we need to use a different approach since we can't aggregate in orderBy
//       // This would require raw SQL or client-side sorting
//       orderBy = { name: sortOrder }; // Fallback
//       break;
//   }

//   return await prisma.products.findMany({
//     where: {
//       AND: [
//         {
//           category: {
//             name: { in: categoryNames, mode: "insensitive" },
//           },
//         },
//         {
//           brand: {
//             name: { in: brandNames, mode: "insensitive" },
//           },
//         },
//         {
//           variants: {
//             some: {
//               price: { gte: minPrice, lte: maxPrice },
//             },
//           },
//         },
//       ],
//     },
//     orderBy,
//     select: {
//       id: true,
//       name: true,
//       brand: {
//         select: {
//           name: true,
//         },
//       },
//       category: {
//         select: {
//           name: true,
//         },
//       },
//       variants: {
//         where: {
//           price: { gte: minPrice, lte: maxPrice },
//         },
//         orderBy: {
//           price: "asc",
//         },
//         select: {
//           id: true,
//           price: true,
//           prevPrice: true,
//           color: true,
//           stock: true,
//         },
//       },
//       _count: {
//         select: {
//           variants: true,
//         },
//       },
//     },
//   });
// };

// // ========================================================================
// // 8. PAGINATION WITH RELATION ORDERING
// // ========================================================================

// export const paginatedProductsByBrand = async (
//   page: number,
//   pageSize: number,
//   brandOrder: "asc" | "desc" = "asc"
// ) => {
//   const skip = (page - 1) * pageSize;

//   return await prisma.products.findMany({
//     skip,
//     take: pageSize,
//     orderBy: [
//       {
//         brand: {
//           name: brandOrder,
//         },
//       },
//       {
//         name: "asc", // Secondary sort by product name
//       },
//     ],
//     select: {
//       id: true,
//       name: true,
//       brand: {
//         select: {
//           name: true,
//         },
//       },
//       category: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
// };

// // ========================================================================
// // 9. UTILITY FUNCTIONS FOR DYNAMIC ORDERING
// // ========================================================================

// export type OrderByField =
//   | "name"
//   | "createdAt"
//   | "brand"
//   | "category"
//   | "variantCount"
//   | "imageCount";

// export type OrderDirection = "asc" | "desc";

// export const buildOrderBy = (
//   field: OrderByField,
//   direction: OrderDirection
// ): Prisma.ProductsOrderByWithRelationInput => {
//   switch (field) {
//     case "name":
//       return { name: direction };
//     case "createdAt":
//       return { createdAt: direction };
//     case "brand":
//       return { brand: { name: direction } };
//     case "category":
//       return { category: { name: direction } };
//     case "variantCount":
//       return { variants: { _count: direction } };
//     case "imageCount":
//       return { imgUrls: { _count: direction } };
//     default:
//       return { name: "asc" };
//   }
// };

// // Usage example with dynamic ordering
// export const getProductsWithDynamicOrder = async (
//   orderField: OrderByField,
//   orderDirection: OrderDirection,
//   page: number = 1,
//   pageSize: number = 10
// ) => {
//   const orderBy = buildOrderBy(orderField, orderDirection);

//   return await prisma.products.findMany({
//     skip: (page - 1) * pageSize,
//     take: pageSize,
//     orderBy,
//     select: {
//       id: true,
//       name: true,
//       createdAt: true,
//       brand: { select: { name: true } },
//       category: { select: { name: true } },
//       _count: {
//         select: {
//           variants: true,
//           imgUrls: true,
//         },
//       },
//     },
//   });
// };

// /*
// ========================================================================
// KEY TAKEAWAYS FOR PRISMA RELATION ORDERING:

// 1. ✅ Simple relation ordering: { brand: { name: "asc" } }
// 2. ✅ Multiple order criteria: Use array of order objects
// 3. ✅ Aggregate ordering: { variants: { _count: "desc" } }
// 4. ✅ Nested relation ordering: { product: { brand: { name: "asc" } } }
// 5. ✅ Order relations within selections: Use orderBy in nested selects
// 6. ❌ Complex aggregations: MIN, MAX, AVG require raw SQL
// 7. ✅ Type safety: Use Prisma.ModelOrderByWithRelationInput types

// LIMITATIONS:
// - Cannot order by MIN/MAX/AVG of related fields without raw SQL
// - Cannot order by calculated fields without raw SQL
// - Complex conditional ordering requires multiple queries or raw SQL

// PERFORMANCE TIPS:
// - Add database indexes for fields used in orderBy
// - Use select to limit returned data
// - Consider pagination for large result sets
// - Test performance with EXPLAIN ANALYZE for complex queries
// ========================================================================
// */
