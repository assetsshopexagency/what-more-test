-- CreateTable
CREATE TABLE "public"."collections" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "shopify_collection_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."video_collections" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "video_collections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "video_collections_video_id_collection_id_key" ON "public"."video_collections"("video_id", "collection_id");

-- AddForeignKey
ALTER TABLE "public"."collections" ADD CONSTRAINT "collections_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_collections" ADD CONSTRAINT "video_collections_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_collections" ADD CONSTRAINT "video_collections_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
