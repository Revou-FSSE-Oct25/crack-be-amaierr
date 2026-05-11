/*
  Warnings:

  - The `rating` column on the `enrollments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER;

-- AlterTable
ALTER TABLE "sub_curriculumns" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0;
