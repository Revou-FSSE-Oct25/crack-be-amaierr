/*
  Warnings:

  - You are about to drop the column `review` on the `enrollments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "review",
ADD COLUMN     "comment" VARCHAR,
ADD COLUMN     "rating" VARCHAR;
