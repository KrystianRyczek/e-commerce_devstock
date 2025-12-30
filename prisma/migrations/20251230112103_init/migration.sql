-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "prevPrice" DOUBLE PRECISION DEFAULT 0,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariants" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER,

    CONSTRAINT "ProductVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersAddresses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesImgUrls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoriesImgUrls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandsImgUrls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "brandId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandsImgUrls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsImgUrls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "main" BOOLEAN NOT NULL,
    "productId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductsImgUrls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartsToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CartsToProducts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_productId_key" ON "Recommendation"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brands_name_key" ON "Brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Carts_userId_key" ON "Carts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UsersAddresses_userId_key" ON "UsersAddresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoriesImgUrls_categoryId_key" ON "CategoriesImgUrls"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandsImgUrls_brandId_key" ON "BrandsImgUrls"("brandId");

-- CreateIndex
CREATE INDEX "_CartsToProducts_B_index" ON "_CartsToProducts"("B");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariants" ADD CONSTRAINT "ProductVariants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersAddresses" ADD CONSTRAINT "UsersAddresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesImgUrls" ADD CONSTRAINT "CategoriesImgUrls_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandsImgUrls" ADD CONSTRAINT "BrandsImgUrls_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsImgUrls" ADD CONSTRAINT "ProductsImgUrls_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsToProducts" ADD CONSTRAINT "_CartsToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartsToProducts" ADD CONSTRAINT "_CartsToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
