CREATE TABLE IF NOT EXISTS `product_offering`
(
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`name` VARCHAR(56) NOT NULL,
`currency` ENUM('USD') NOT NULL DEFAULT 'USD',
PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `subscriber`
(
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE ,
`status` ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
`account_balance` DECIMAL(14,5) NOT NULL DEFAULT 0.0,
`product_offering_id` INT(10) UNSIGNED,
`demo_code` VARCHAR(255),
`my_number` VARCHAR(20),
`email` VARCHAR(56) NOT NULL UNIQUE ,
`pwd` VARCHAR(24),
`social_id_provider` VARCHAR(32),
`social_id` VARCHAR(255),
`first` VARCHAR(32),
`last` VARCHAR(64),
PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `application`
(
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`name` CHAR(70) NOT NULL,
`subscriber_id` INT(10) UNSIGNED NOT NULL,
`callback_url` VARCHAR(255),
`dialogflow_id` INT(10) UNSIGNED,
`lang_code` VARCHAR(8),
`event_name` VARCHAR(32),
`want_transcriptions` TINYINT NOT NULL DEFAULT 0,
`want_intents` TINYINT NOT NULL DEFAULT 0,
`want_dtmf` TINYINT NOT NULL DEFAULT 0,
PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `dialogflow`
(
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`subscriber_id` INT(10) UNSIGNED NOT NULL,
`name` VARCHAR(56) NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `api_token`
(
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`name` VARCHAR(56) NOT NULL,
`token_value` VARCHAR(255),
`subscriber_id` INT(10) UNSIGNED NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `phone_number`
(
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`e164` VARCHAR(20) NOT NULL,
`is_shared` TINYINT NOT NULL DEFAULT 0,
`subscriber_id` INT(10) UNSIGNED NOT NULL,
`telecom_id` INT(10) UNSIGNED NOT NULL,
`application_id` INT(10) UNSIGNED NOT NULL,
PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `telecom`
(
`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`)
);

ALTER TABLE `subscriber` ADD FOREIGN KEY product_offering_id_idxfk (`product_offering_id`) REFERENCES `product_offering` (`id`);

ALTER TABLE `application` ADD FOREIGN KEY subscriber_id_idxfk (`subscriber_id`) REFERENCES `subscriber` (`id`);

ALTER TABLE `application` ADD FOREIGN KEY dialogflow_id_idxfk (`dialogflow_id`) REFERENCES `dialogflow` (`id`);

ALTER TABLE `dialogflow` ADD FOREIGN KEY subscriber_id_idxfk_1 (`subscriber_id`) REFERENCES `subscriber` (`id`);

ALTER TABLE `api_token` ADD FOREIGN KEY subscriber_id_idxfk_2 (`subscriber_id`) REFERENCES `subscriber` (`id`);

ALTER TABLE `phone_number` ADD FOREIGN KEY subscriber_id_idxfk_3 (`subscriber_id`) REFERENCES `subscriber` (`id`);

ALTER TABLE `phone_number` ADD FOREIGN KEY telecom_id_idxfk (`telecom_id`) REFERENCES `telecom` (`id`);

ALTER TABLE `phone_number` ADD FOREIGN KEY application_id_idxfk (`application_id`) REFERENCES `application` (`id`);
