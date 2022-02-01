/*
  Warnings:

  - A unique constraint covering the columns `[userPropiId]` on the table `Mercadopago` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL,
    MODIFY `accountType` VARCHAR(191) NULL,
    MODIFY `profileName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Mercadopago_userPropiId_key` ON `Mercadopago`(`userPropiId`);
