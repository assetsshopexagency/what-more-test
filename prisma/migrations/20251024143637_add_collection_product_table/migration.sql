-- CreateTable
CREATE TABLE "public"."collection_products" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "collection_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_products_video_id_collection_id_product_id_key" ON "public"."collection_products"("video_id", "collection_id", "product_id");

-- AddForeignKey
ALTER TABLE "public"."collection_products" ADD CONSTRAINT "collection_products_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "public"."media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."collection_products" ADD CONSTRAINT "collection_products_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."collection_products" ADD CONSTRAINT "collection_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
