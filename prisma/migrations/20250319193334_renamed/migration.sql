/*
  Warnings:

  - You are about to drop the `FilesUpload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoldersUpload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkSessionUpload` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersUpload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FilesUpload" DROP CONSTRAINT "FilesUpload_folderId_fkey";

-- DropForeignKey
ALTER TABLE "FilesUpload" DROP CONSTRAINT "FilesUpload_usersId_fkey";

-- DropForeignKey
ALTER TABLE "FoldersUpload" DROP CONSTRAINT "FoldersUpload_parentId_fkey";

-- DropForeignKey
ALTER TABLE "FoldersUpload" DROP CONSTRAINT "FoldersUpload_usersId_fkey";

-- DropTable
DROP TABLE "FilesUpload";

-- DropTable
DROP TABLE "FoldersUpload";

-- DropTable
DROP TABLE "LinkSessionUpload";

-- DropTable
DROP TABLE "UsersUpload";

-- CreateTable
CREATE TABLE "UsersUploader" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "UsersUploader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilesUploader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folderId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "FilesUploader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoldersUploader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '/',
    "parentId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "FoldersUploader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkSessionUploader" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkSessionUploader_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersUploader_username_key" ON "UsersUploader"("username");

-- AddForeignKey
ALTER TABLE "FilesUploader" ADD CONSTRAINT "FilesUploader_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "FoldersUploader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilesUploader" ADD CONSTRAINT "FilesUploader_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "UsersUploader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersUploader" ADD CONSTRAINT "FoldersUploader_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FoldersUploader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoldersUploader" ADD CONSTRAINT "FoldersUploader_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "UsersUploader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
