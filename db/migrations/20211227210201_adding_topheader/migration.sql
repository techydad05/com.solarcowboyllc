/*
  Warnings:

  - You are about to drop the column `links` on the `TopHeader` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `TopHeader` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TopHeader" DROP COLUMN "links",
DROP COLUMN "logo";
