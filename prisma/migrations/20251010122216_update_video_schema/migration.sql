-- AlterTable
ALTER TABLE "public"."media_files" ADD COLUMN     "download_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "duration" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."video_engagements" (
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
CREATE TABLE "public"."video_comments" (
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

-- CreateIndex
CREATE UNIQUE INDEX "video_engagements_userId_mediaFileId_key" ON "public"."video_engagements"("userId", "mediaFileId");

-- AddForeignKey
ALTER TABLE "public"."video_engagements" ADD CONSTRAINT "video_engagements_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_engagements" ADD CONSTRAINT "video_engagements_mediaFileId_fkey" FOREIGN KEY ("mediaFileId") REFERENCES "public"."media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_comments" ADD CONSTRAINT "video_comments_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_comments" ADD CONSTRAINT "video_comments_mediaFileId_fkey" FOREIGN KEY ("mediaFileId") REFERENCES "public"."media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
