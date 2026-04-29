/*
  Warnings:

  - You are about to drop the column `instructor` on the `courses` table. All the data in the column will be lost.
  - Added the required column `instructor_id` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_instructor_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "instructor",
ADD COLUMN     "instructor_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
