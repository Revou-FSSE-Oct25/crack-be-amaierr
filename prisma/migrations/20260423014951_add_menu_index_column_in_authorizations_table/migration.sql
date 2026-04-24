/*
  Warnings:

  - Added the required column `menu_index` to the `authotizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authotizations" ADD COLUMN     "menu_index" INTEGER NOT NULL;
