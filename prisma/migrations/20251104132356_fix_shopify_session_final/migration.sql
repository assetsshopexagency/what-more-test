/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."collections" DROP CONSTRAINT "collections_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."media_files" DROP CONSTRAINT "media_files_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."video_comments" DROP CONSTRAINT "video_comments_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."video_engagements" DROP CONSTRAINT "video_engagements_sessionId_fkey";

-- DropTable
DROP TABLE "public"."sessions";

-- CreateTable
CREATE TABLE "shopify_sessions" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT true,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "shopify_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopify_sessions_clerkUserId_key" ON "shopify_sessions"("clerkUserId");

-- CreateIndex
CREATE INDEX "shopify_sessions_shop_idx" ON "shopify_sessions"("shop");

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "shopify_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_engagements" ADD CONSTRAINT "video_engagements_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "shopify_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_comments" ADD CONSTRAINT "video_comments_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "shopify_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "shopify_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "shopify_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
