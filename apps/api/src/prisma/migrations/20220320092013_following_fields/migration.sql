/*
  Warnings:

  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userId",
ADD COLUMN     "followingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userFollowerId" TEXT,
ADD COLUMN     "userFollowingId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userFollowerId_fkey" FOREIGN KEY ("userFollowerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userFollowingId_fkey" FOREIGN KEY ("userFollowingId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
