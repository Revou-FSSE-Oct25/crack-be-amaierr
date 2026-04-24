/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `menus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menus" ADD COLUMN     "code" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "menus_code_key" ON "menus"("code");

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
