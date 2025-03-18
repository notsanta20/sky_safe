-- CreateTable
CREATE TABLE "LinkSession" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkSession_pkey" PRIMARY KEY ("id")
);
