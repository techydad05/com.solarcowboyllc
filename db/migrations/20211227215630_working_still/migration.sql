/*
  Warnings:

  - You are about to drop the `TopHeader` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Footer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Footer" ADD COLUMN     "links" TEXT NOT NULL DEFAULT E'Home',
ADD COLUMN     "logo" TEXT NOT NULL DEFAULT E'cmslogo.svg',
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "TopHeader";

-- CreateTable
CREATE TABLE "Header" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "logo" TEXT NOT NULL DEFAULT E'cmslogo.svg',
    "links" TEXT NOT NULL DEFAULT E'Home',

    CONSTRAINT "Header_pkey" PRIMARY KEY ("id")
);
