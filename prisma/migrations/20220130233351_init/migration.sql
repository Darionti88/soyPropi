-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `accountType` VARCHAR(191) NOT NULL,
    `profileName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_profileName_key`(`profileName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mercadopago` (
    `mpid` INTEGER NOT NULL AUTO_INCREMENT,
    `access_token` VARCHAR(191) NOT NULL,
    `expires_in` INTEGER NOT NULL,
    `live_mode` BOOLEAN NOT NULL,
    `public_key` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,
    `token_type` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`mpid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
