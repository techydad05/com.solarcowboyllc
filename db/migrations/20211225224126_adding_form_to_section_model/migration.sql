/*
  Warnings:

  - You are about to drop the column `hasForm` on the `Section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "hasForm",
ADD COLUMN     "form" TEXT;
