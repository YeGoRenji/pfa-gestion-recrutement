/*
  Warnings:

  - Added the required column `address` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Administrator" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
