/*
  Warnings:

  - You are about to drop the `_ProjectstLiked` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectstLiked" DROP CONSTRAINT "_ProjectstLiked_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectstLiked" DROP CONSTRAINT "_ProjectstLiked_B_fkey";

-- DropTable
DROP TABLE "_ProjectstLiked";
