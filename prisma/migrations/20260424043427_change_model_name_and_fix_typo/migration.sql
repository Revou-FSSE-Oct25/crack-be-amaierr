/*
  Warnings:

  - You are about to drop the `authotizations` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `level_type` on the `courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LevelTypes" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- DropForeignKey
ALTER TABLE "authotizations" DROP CONSTRAINT "fk_menu";

-- DropForeignKey
ALTER TABLE "authotizations" DROP CONSTRAINT "fk_role";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "level_type",
ADD COLUMN     "level_type" "LevelTypes" NOT NULL;

-- DropTable
DROP TABLE "authotizations";

-- DropEnum
DROP TYPE "LevelType";

-- CreateTable
CREATE TABLE "authorizations" (
    "menu_index" INTEGER NOT NULL,
    "role_id" UUID NOT NULL,
    "menu_id" UUID NOT NULL,

    CONSTRAINT "authorizations_pkey" PRIMARY KEY ("menu_id","role_id")
);

-- AddForeignKey
ALTER TABLE "authorizations" ADD CONSTRAINT "fk_menu" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authorizations" ADD CONSTRAINT "fk_role" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
