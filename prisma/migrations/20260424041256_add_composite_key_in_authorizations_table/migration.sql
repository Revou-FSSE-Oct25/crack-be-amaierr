/*
  Warnings:

  - The primary key for the `authotizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `authotizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authotizations" DROP CONSTRAINT "authotizations_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "authotizations_pkey" PRIMARY KEY ("menu_id", "role_id");
