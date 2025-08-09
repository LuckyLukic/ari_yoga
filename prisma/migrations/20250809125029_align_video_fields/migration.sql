/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `cfAssetId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `cfPlaybackId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `durationSec` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `isFreePreview` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "passwordHash" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
DROP COLUMN "plan",
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free';

-- AlterTable
ALTER TABLE "public"."Video" DROP COLUMN "cfAssetId",
DROP COLUMN "cfPlaybackId",
DROP COLUMN "durationSec",
DROP COLUMN "isFreePreview",
ADD COLUMN     "durationMin" INTEGER,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "posterUrl" TEXT,
ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "srcUrl" TEXT;
