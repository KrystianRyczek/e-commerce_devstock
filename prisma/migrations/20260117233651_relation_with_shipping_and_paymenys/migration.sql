/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `shippingMethod` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "paymentId",
DROP COLUMN "shippingMethod",
ADD COLUMN     "paymentMethodId" INTEGER,
ADD COLUMN     "shippingMethodId" INTEGER;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_shippingMethodId_fkey" FOREIGN KEY ("shippingMethodId") REFERENCES "shippingMethods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "paymentMethods"("id") ON DELETE SET NULL ON UPDATE CASCADE;
