-- CreateTable
CREATE TABLE "Session" (
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
    "emailVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkUserId" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_files" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "shopify_file_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail_url" TEXT,
    "shopify_file_id" TEXT,
    "duration" INTEGER DEFAULT 0,
    "download_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_engagements" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "mediaFileId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT false,
    "shared" BOOLEAN NOT NULL DEFAULT false,
    "saved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_engagements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_comments" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "mediaFileId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "userEmail" TEXT,
    "userName" TEXT,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "shopify_product_id" TEXT NOT NULL,
    "shopify_variant_id" TEXT,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collections" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "shopify_collection_id" TEXT NOT NULL,
    "shopify_collection_products_variant_ids" TEXT[],
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_products" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "video_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_collections" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "video_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection_products" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "collection_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_clerkUserId_key" ON "Session"("clerkUserId");

-- CreateIndex
CREATE INDEX "Session_shop_idx" ON "Session"("shop");

-- CreateIndex
CREATE INDEX "Session_clerkUserId_idx" ON "Session"("clerkUserId");

-- CreateIndex
CREATE INDEX "Session_expires_idx" ON "Session"("expires");

-- CreateIndex
CREATE INDEX "media_files_sessionId_idx" ON "media_files"("sessionId");

-- CreateIndex
CREATE INDEX "media_files_shopify_file_id_idx" ON "media_files"("shopify_file_id");

-- CreateIndex
CREATE INDEX "video_engagements_sessionId_idx" ON "video_engagements"("sessionId");

-- CreateIndex
CREATE INDEX "video_engagements_mediaFileId_idx" ON "video_engagements"("mediaFileId");

-- CreateIndex
CREATE INDEX "video_engagements_userId_idx" ON "video_engagements"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "video_engagements_userId_mediaFileId_key" ON "video_engagements"("userId", "mediaFileId");

-- CreateIndex
CREATE INDEX "video_comments_sessionId_idx" ON "video_comments"("sessionId");

-- CreateIndex
CREATE INDEX "video_comments_mediaFileId_idx" ON "video_comments"("mediaFileId");

-- CreateIndex
CREATE INDEX "video_comments_userId_idx" ON "video_comments"("userId");

-- CreateIndex
CREATE INDEX "video_comments_created_at_idx" ON "video_comments"("created_at");

-- CreateIndex
CREATE INDEX "products_sessionId_idx" ON "products"("sessionId");

-- CreateIndex
CREATE INDEX "products_shopify_product_id_idx" ON "products"("shopify_product_id");

-- CreateIndex
CREATE INDEX "collections_sessionId_idx" ON "collections"("sessionId");

-- CreateIndex
CREATE INDEX "collections_shopify_collection_id_idx" ON "collections"("shopify_collection_id");

-- CreateIndex
CREATE INDEX "video_products_video_id_idx" ON "video_products"("video_id");

-- CreateIndex
CREATE INDEX "video_products_product_id_idx" ON "video_products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "video_products_video_id_product_id_key" ON "video_products"("video_id", "product_id");

-- CreateIndex
CREATE INDEX "video_collections_video_id_idx" ON "video_collections"("video_id");

-- CreateIndex
CREATE INDEX "video_collections_collection_id_idx" ON "video_collections"("collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "video_collections_video_id_collection_id_key" ON "video_collections"("video_id", "collection_id");

-- CreateIndex
CREATE INDEX "collection_products_video_id_idx" ON "collection_products"("video_id");

-- CreateIndex
CREATE INDEX "collection_products_collection_id_idx" ON "collection_products"("collection_id");

-- CreateIndex
CREATE INDEX "collection_products_product_id_idx" ON "collection_products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "collection_products_video_id_collection_id_product_id_key" ON "collection_products"("video_id", "collection_id", "product_id");

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_engagements" ADD CONSTRAINT "video_engagements_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_engagements" ADD CONSTRAINT "video_engagements_mediaFileId_fkey" FOREIGN KEY ("mediaFileId") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_comments" ADD CONSTRAINT "video_comments_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_comments" ADD CONSTRAINT "video_comments_mediaFileId_fkey" FOREIGN KEY ("mediaFileId") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_products" ADD CONSTRAINT "video_products_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_products" ADD CONSTRAINT "video_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_collections" ADD CONSTRAINT "video_collections_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_collections" ADD CONSTRAINT "video_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_products" ADD CONSTRAINT "collection_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
