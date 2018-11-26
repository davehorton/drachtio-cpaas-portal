-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 22, 2018 at 08:44 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cpass-db-schema`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_token`
--

CREATE TABLE `api_token` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(56) NOT NULL,
  `token_value` varchar(255) DEFAULT NULL,
  `subscriber_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` char(70) NOT NULL,
  `subscriber_id` int(10) UNSIGNED NOT NULL,
  `callback_url` varchar(255) DEFAULT NULL,
  `dialogflow_id` int(10) UNSIGNED DEFAULT NULL,
  `lang_code` varchar(8) DEFAULT NULL,
  `event_name` varchar(32) DEFAULT NULL,
  `want_transcriptions` tinyint(4) NOT NULL DEFAULT '0',
  `want_intents` tinyint(4) NOT NULL DEFAULT '0',
  `want_dtmf` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dialogflow`
--

CREATE TABLE `dialogflow` (
  `id` int(10) UNSIGNED NOT NULL,
  `subscriber_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(56) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `phone_number`
--

CREATE TABLE `phone_number` (
  `id` int(10) UNSIGNED NOT NULL,
  `e164` varchar(20) NOT NULL,
  `is_shared` tinyint(4) NOT NULL DEFAULT '0',
  `subscriber_id` int(10) UNSIGNED NOT NULL,
  `telecom_id` int(10) UNSIGNED NOT NULL,
  `application_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_offering`
--

CREATE TABLE `product_offering` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(56) NOT NULL,
  `currency` enum('USD') NOT NULL DEFAULT 'USD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE `subscriber` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(56) NOT NULL,
  `name` varchar(30) NOT NULL,
  `pwd` text NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'INACTIVE',
  `account_balance` decimal(14,5) NOT NULL DEFAULT '0.00000',
  `product_offering_id` int(10) UNSIGNED DEFAULT NULL,
  `demo_code` varchar(255) NOT NULL,
  `my_number` varchar(20) NOT NULL,
  `third_party_connect` varchar(30) NOT NULL,
  `confirm_url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `telecom`
--

CREATE TABLE `telecom` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `telecom`
--

INSERT INTO `telecom` (`id`, `name`) VALUES
(1, 'None');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_token`
--
ALTER TABLE `api_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriber_id_idxfk_3` (`subscriber_id`);

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriber_id_idxfk_2` (`subscriber_id`),
  ADD KEY `dialogflow_id_idxfk` (`dialogflow_id`);

--
-- Indexes for table `dialogflow`
--
ALTER TABLE `dialogflow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriber_id_idxfk_1` (`subscriber_id`);

--
-- Indexes for table `phone_number`
--
ALTER TABLE `phone_number`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriber_id_idxfk` (`subscriber_id`),
  ADD KEY `telecom_id_idxfk` (`telecom_id`);

--
-- Indexes for table `product_offering`
--
ALTER TABLE `product_offering`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscriber`
--
ALTER TABLE `subscriber`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `product_offering_id_idxfk` (`product_offering_id`);

--
-- Indexes for table `telecom`
--
ALTER TABLE `telecom`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_token`
--
ALTER TABLE `api_token`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dialogflow`
--
ALTER TABLE `dialogflow`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phone_number`
--
ALTER TABLE `phone_number`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `product_offering`
--
ALTER TABLE `product_offering`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriber`
--
ALTER TABLE `subscriber`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `telecom`
--
ALTER TABLE `telecom`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_token`
--
ALTER TABLE `api_token`
  ADD CONSTRAINT `subscriber_id_idxfk_3` FOREIGN KEY (`subscriber_id`) REFERENCES `subscriber` (`id`);

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `dialogflow_id_idxfk` FOREIGN KEY (`dialogflow_id`) REFERENCES `dialogflow` (`id`),
  ADD CONSTRAINT `subscriber_id_idxfk_2` FOREIGN KEY (`subscriber_id`) REFERENCES `subscriber` (`id`);

--
-- Constraints for table `dialogflow`
--
ALTER TABLE `dialogflow`
  ADD CONSTRAINT `subscriber_id_idxfk_1` FOREIGN KEY (`subscriber_id`) REFERENCES `subscriber` (`id`);

--
-- Constraints for table `phone_number`
--
ALTER TABLE `phone_number`
  ADD CONSTRAINT `subscriber_id_idxfk` FOREIGN KEY (`subscriber_id`) REFERENCES `subscriber` (`id`),
  ADD CONSTRAINT `telecom_id_idxfk` FOREIGN KEY (`telecom_id`) REFERENCES `telecom` (`id`);

--
-- Constraints for table `subscriber`
--
ALTER TABLE `subscriber`
  ADD CONSTRAINT `product_offering_id_idxfk` FOREIGN KEY (`product_offering_id`) REFERENCES `product_offering` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
