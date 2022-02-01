/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `accounts_userId_key` ON `accounts`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `sessions_userId_key` ON `sessions`(`userId`);
