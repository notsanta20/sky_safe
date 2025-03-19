/*
  Warnings:

  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Folders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Files" DROP CONSTRAINT "Files_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Folders" DROP CONSTRAINT "Folders_usersId_fkey";

-- DropTable
DROP TABLE "Files";

-- DropTable
DROP TABLE "Folders";

-- DropTable
DROP TABLE "LinkSession";

-- CreateTable
CREATE TABLE "FilesUpload" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folderId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "FilesUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoldersUpload" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '/',
    "parentId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "FoldersUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkSessionUpload" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkSessionUpload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FilesUpload" ADD CONSTRAINT "FilesUpload_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FoldersUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilesUpload" ADD CONSTRAINT "FilesUpload_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "UsersUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersUpload" ADD CONSTRAINT "FoldersUpload_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FoldersUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersUpload" ADD CONSTRAINT "FoldersUpload_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "UsersUpload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
