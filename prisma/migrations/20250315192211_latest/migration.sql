/*
  Warnings:

  - Made the column `parentId` on table `Folders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_parentId_fkey";

-- AlterTable
ALTER TABLE "Folders" ALTER COLUMN "parentId" SET NOT NULL;
