/*
  Warnings:

  - You are about to drop the `FilesUploader` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoldersUploader` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkSessionUploader` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionUploader` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersUploader` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FilesUploader" DROP CONSTRAINT "FilesUploader_folderId_fkey";

-- DropForeignKey
ALTER TABLE "FilesUploader" DROP CONSTRAINT "FilesUploader_usersId_fkey";

-- DropForeignKey
ALTER TABLE "FoldersUploader" DROP CONSTRAINT "FoldersUploader_parentId_fkey";

-- DropForeignKey
ALTER TABLE "FoldersUploader" DROP CONSTRAINT "FoldersUploader_usersId_fkey";

-- DropTable
DROP TABLE "FilesUploader";

-- DropTable
DROP TABLE "FoldersUploader";

-- DropTable
DROP TABLE "LinkSessionUploader";

-- DropTable
DROP TABLE "SessionUploader";

-- DropTable
DROP TABLE "UsersUploader";

-- CreateTable
CREATE TABLE "Session_upload" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_upload" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Users_upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folderId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '/',
    "parentId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkSession" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_upload_sid_key" ON "Session_upload"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_upload_username_key" ON "Users_upload"("username");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users_upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders" ADD CONSTRAINT "Folders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users_upload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
