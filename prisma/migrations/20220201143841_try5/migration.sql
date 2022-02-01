/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mercadopago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Mercadopago`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `oauth_token_secret` VARCHAR(191) NULL,
    `oauth_token` VARCHAR(191) NULL,

    UNIQUE INDEX `accounts_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessions_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NULL,
    `accountType` VARCHAR(191) NULL,
    `profileName` VARCHAR(191) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_profileName_key`(`profileName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mercadopago` (
    `user_id` INTEGER NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `expires_in` INTEGER NOT NULL,
    `live_mode` BOOLEAN NOT NULL,
    `public_key` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,
    `token_type` VARCHAR(191) NOT NULL,
    `userPropiId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `mercadopago_userPropiId_key`(`userPropiId`),
    INDEX `mercadopago_userPropiId_idx`(`userPropiId`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
