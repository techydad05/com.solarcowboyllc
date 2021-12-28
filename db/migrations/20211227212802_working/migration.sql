/*
  Warnings:

  - Added the required column `name` to the `TopHeader` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopHeader" ADD COLUMN     "Title" TEXT,
ADD COLUMN     "links" TEXT NOT NULL DEFAULT E'Home',
ADD COLUMN     "logo" TEXT DEFAULT E'cmslogo.svg',
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);
