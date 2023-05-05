-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isReported" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reportCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reportedBy" TEXT[];
