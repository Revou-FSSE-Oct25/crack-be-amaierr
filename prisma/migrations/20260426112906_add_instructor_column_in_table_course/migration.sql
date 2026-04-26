/*
  Warnings:

  - Added the required column `instructor` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "instructor" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_fkey" FOREIGN KEY ("instructor") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
