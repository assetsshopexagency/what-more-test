/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "clerkUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_clerkUserId_key" ON "sessions"("clerkUserId");
