/*
  Warnings:

  - You are about to drop the column `folderId` on the `Files` table. All the data in the column will be lost.
  - Added the required column `location` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_folderId_fkey";

-- AlterTable
ALTER TABLE "Files" DROP COLUMN "folderId",
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "location" TEXT NOT NULL;
