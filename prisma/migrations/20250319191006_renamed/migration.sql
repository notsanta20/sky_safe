/*
  Warnings:

  - You are about to drop the `Files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Folders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
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

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Session_uploader" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_uploader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_uploader" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Users_uploader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files_uploader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folderId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Files_uploader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folders_uploader" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '/',
    "parentId" TEXT,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "Folders_uploader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkSession_uploader" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkSession_uploader_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_uploader_sid_key" ON "Session_uploader"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_uploader_username_key" ON "Users_uploader"("username");

-- AddForeignKey
ALTER TABLE "Files_uploader" ADD CONSTRAINT "Files_uploader_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders_uploader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files_uploader" ADD CONSTRAINT "Files_uploader_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users_uploader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders_uploader" ADD CONSTRAINT "Folders_uploader_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folders_uploader"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folders_uploader" ADD CONSTRAINT "Folders_uploader_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users_uploader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
