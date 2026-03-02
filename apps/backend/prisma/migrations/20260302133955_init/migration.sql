-- CreateTable
CREATE TABLE `stadiums` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `imageUrl` VARCHAR(500) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(3) NOT NULL,
    `flagUrl` VARCHAR(500) NULL,
    `confederation` VARCHAR(20) NOT NULL,
    `groupId` INTEGER NULL,

    UNIQUE INDEX `teams_code_key`(`code`),
    INDEX `teams_groupId_idx`(`groupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(2) NOT NULL,

    UNIQUE INDEX `groups_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_standings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,
    `played` INTEGER NOT NULL DEFAULT 0,
    `won` INTEGER NOT NULL DEFAULT 0,
    `drawn` INTEGER NOT NULL DEFAULT 0,
    `lost` INTEGER NOT NULL DEFAULT 0,
    `goalsFor` INTEGER NOT NULL DEFAULT 0,
    `goalsAgainst` INTEGER NOT NULL DEFAULT 0,
    `goalDifference` INTEGER NOT NULL DEFAULT 0,
    `points` INTEGER NOT NULL DEFAULT 0,

    INDEX `group_standings_groupId_idx`(`groupId`),
    INDEX `group_standings_teamId_idx`(`teamId`),
    UNIQUE INDEX `group_standings_groupId_teamId_key`(`groupId`, `teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(50) NULL,
    `phase` ENUM('GROUP_STAGE', 'ROUND_OF_32', 'ROUND_OF_16', 'QUARTER_FINAL', 'SEMI_FINAL', 'THIRD_PLACE', 'FINAL') NOT NULL,
    `groupId` INTEGER NULL,
    `matchDay` INTEGER NULL,
    `dateUtc` DATETIME(3) NOT NULL,
    `stadiumId` INTEGER NULL,
    `homeTeamId` INTEGER NULL,
    `awayTeamId` INTEGER NULL,
    `homeScore` INTEGER NULL,
    `awayScore` INTEGER NULL,
    `homePenalties` INTEGER NULL,
    `awayPenalties` INTEGER NULL,
    `status` ENUM('SCHEDULED', 'TIMED', 'IN_PLAY', 'PAUSED', 'HALF_TIME', 'EXTRA_TIME', 'PENALTY_SHOOTOUT', 'FINISHED', 'SUSPENDED', 'POSTPONED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
    `minute` INTEGER NULL,

    UNIQUE INDEX `matches_externalId_key`(`externalId`),
    INDEX `matches_phase_idx`(`phase`),
    INDEX `matches_status_idx`(`status`),
    INDEX `matches_dateUtc_idx`(`dateUtc`),
    INDEX `matches_groupId_idx`(`groupId`),
    INDEX `matches_homeTeamId_idx`(`homeTeamId`),
    INDEX `matches_awayTeamId_idx`(`awayTeamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchId` INTEGER NOT NULL,
    `type` ENUM('GOAL', 'OWN_GOAL', 'PENALTY_GOAL', 'PENALTY_MISS', 'YELLOW_CARD', 'RED_CARD', 'SECOND_YELLOW', 'SUBSTITUTION', 'VAR_DECISION') NOT NULL,
    `minute` INTEGER NOT NULL,
    `extraMinute` INTEGER NULL,
    `teamId` INTEGER NULL,
    `playerName` VARCHAR(100) NULL,
    `detail` VARCHAR(255) NULL,

    INDEX `match_events_matchId_idx`(`matchId`),
    INDEX `match_events_teamId_idx`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_standings` ADD CONSTRAINT `group_standings_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_standings` ADD CONSTRAINT `group_standings_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_stadiumId_fkey` FOREIGN KEY (`stadiumId`) REFERENCES `stadiums`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_homeTeamId_fkey` FOREIGN KEY (`homeTeamId`) REFERENCES `teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matches` ADD CONSTRAINT `matches_awayTeamId_fkey` FOREIGN KEY (`awayTeamId`) REFERENCES `teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_events` ADD CONSTRAINT `match_events_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `matches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_events` ADD CONSTRAINT `match_events_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
