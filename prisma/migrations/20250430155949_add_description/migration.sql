/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `UMKMProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UMKMProduct" ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "Product";
