/*
  Warnings:

  - You are about to drop the column `position` on the `PlaylistItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."PlaylistItem_playlistId_position_idx";

-- AlterTable
ALTER TABLE "public"."PlaylistItem" DROP COLUMN "position",
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'IT',
ADD COLUMN     "fiscalCode" TEXT,
ADD COLUMN     "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "profileCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "streetAddress" TEXT,
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "public"."Video" ALTER COLUMN "level" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "PlaylistItem_playlistId_order_idx" ON "public"."PlaylistItem"("playlistId", "order");
