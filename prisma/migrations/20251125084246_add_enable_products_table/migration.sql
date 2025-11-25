/*
  Warnings:

  - A unique constraint covering the columns `[shop]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "enable_products" (
    "id" SERIAL NOT NULL,
    "video_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "enable_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "enable_products_video_id_idx" ON "enable_products"("video_id");

-- CreateIndex
CREATE INDEX "enable_products_product_id_idx" ON "enable_products"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "enable_products_video_id_product_id_key" ON "enable_products"("video_id", "product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_shop_key" ON "Session"("shop");

-- AddForeignKey
ALTER TABLE "enable_products" ADD CONSTRAINT "enable_products_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enable_products" ADD CONSTRAINT "enable_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
