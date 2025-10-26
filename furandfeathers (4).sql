-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 26, 2025 at 05:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `furandfeathers`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `admin_overview`
-- (See below for the actual view)
--
CREATE TABLE `admin_overview` (
`total_users` bigint(21)
,`total_pets` bigint(21)
,`adoptions_completed` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `adoption_applications`
--

CREATE TABLE `adoption_applications` (
  `id` bigint(20) NOT NULL,
  `adopter_id` bigint(20) NOT NULL,
  `pet_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) NOT NULL,
  `adopter_id` bigint(20) DEFAULT NULL,
  `pet_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `shelter_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `name`, `age`, `breed`, `description`, `image_url`, `status`, `shelter_id`, `created_at`) VALUES
(1, 'Bella', 2, 'Golden Retriever', NULL, 'http://localhost:8080/uploads/pets_1.png', 'AVAILABLE', 2, '2025-10-26 15:29:25'),
(2, 'Max', 3, 'Bulldog', NULL, 'http://localhost:8080/uploads/pets_2.png', 'ADOPTED', 2, '2025-10-26 15:29:25'),
(3, 'Cat 1', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_3.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(4, 'Cat 2', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_4.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(5, 'Cat 3', 3, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_5.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(6, 'Cat 4', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_6.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(7, 'Cat 5', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_7.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(8, 'Cat 6', 4, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_8.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(9, 'Cat 7', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_9.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(10, 'Cat 8', 3, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_10.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(11, 'Cat 9', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_11.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(12, 'Cat 10', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_12.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(13, 'Cat 11', 3, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_13.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(14, 'Cat 12', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_14.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(15, 'Cat 13', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_15.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(16, 'Cat 14', 4, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_16.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(17, 'Cat 15', 3, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_17.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(18, 'Dog 1', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_18.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(19, 'Dog 2', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_19.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(20, 'Dog 3', 3, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_20.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(21, 'Dog 4', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_21.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(22, 'Dog 5', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_22.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(23, 'Dog 6', 4, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_23.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(24, 'Dog 7', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_24.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(25, 'Dog 8', 3, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_25.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(26, 'Dog 9', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_26.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(27, 'Dog 10', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_27.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(28, 'Dog 11', 3, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_28.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(29, 'Dog 12', 1, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_29.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25'),
(30, 'Dog 13', 2, 'Mixed', NULL, 'http://localhost:8080/uploads/pets_30.jpg', 'AVAILABLE', 5, '2025-10-26 15:29:25');

-- --------------------------------------------------------

--
-- Stand-in structure for view `shelter_stats`
-- (See below for the actual view)
--
CREATE TABLE `shelter_stats` (
`shelter_id` bigint(20)
,`total_pets` bigint(21)
,`adopted_pets` decimal(23,0)
,`available_pets` decimal(23,0)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `provider`, `picture`, `verified`, `created_at`) VALUES
(1, 'Super Admin', 'superadmin@furandfeathers.com', '$2a$10$h7r5sZbK9mAqx3uJ3bO1MuAErhLp3Jg6p7S21vfrF5o6T0Wb08TfS', NULL, NULL, 1, '2025-10-26 15:29:24'),
(2, 'Happy Paws Shelter', 'happy@shelter.com', '$2a$10$dummyhash', NULL, NULL, 1, '2025-10-26 15:29:25'),
(5, 'Test Shelter', 'test@shelter.com', '$2a$10$dummyhash', NULL, NULL, 1, '2025-10-26 15:29:25'),
(6, 'John Doe', 'john@adopter.com', '$2a$10$dummyhash', NULL, NULL, 1, '2025-10-26 15:29:25'),
(7, 'Saddam Hussain', 'husseinsaddam894@gmail.com', 'GOOGLE_AUTH_NO_PASSWORD', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocJ5TEg1Moc6sKHnsawJON06da-u9EpSD-Maihs6byy0V6qt9YABvw=s96-c', 1, '2025-10-26 15:33:55'),
(8, 'Saddam Hussain Safi (‫سدام حسین‬‎)', 'hussainsaddam.np@gmail.com', 'GOOGLE_AUTH_NO_PASSWORD', 'google', 'https://lh3.googleusercontent.com/a/ACg8ocKrKvbL-FXaqq4lbEU16VyEQWbf-ikcpO3ech8-kooLvSh7tyScww=s96-c', 1, '2025-10-26 15:45:49');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `prevent_super_admin_delete` BEFORE DELETE ON `users` FOR EACH ROW BEGIN
    IF OLD.id = 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Super Admin cannot be deleted.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure for view `admin_overview`
--
DROP TABLE IF EXISTS `admin_overview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admin_overview`  AS SELECT (select count(0) from `users`) AS `total_users`, (select count(0) from `pets`) AS `total_pets`, (select count(0) from `adoption_applications` where `adoption_applications`.`status` = 'APPROVED') AS `adoptions_completed` ;

-- --------------------------------------------------------

--
-- Structure for view `shelter_stats`
--
DROP TABLE IF EXISTS `shelter_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `shelter_stats`  AS SELECT `u`.`id` AS `shelter_id`, count(`p`.`id`) AS `total_pets`, sum(`p`.`status` = 'ADOPTED') AS `adopted_pets`, sum(`p`.`status` = 'AVAILABLE') AS `available_pets` FROM (`users` `u` left join `pets` `p` on(`u`.`id` = `p`.`shelter_id`)) GROUP BY `u`.`id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `adoption_applications`
--
ALTER TABLE `adoption_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_applications_adopter_id` (`adopter_id`),
  ADD KEY `idx_applications_pet_id` (`pet_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adopter_id` (`adopter_id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_messages_sender_id` (`sender_id`),
  ADD KEY `idx_messages_receiver_id` (`receiver_id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_pets_shelter_id` (`shelter_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adoption_applications`
--
ALTER TABLE `adoption_applications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `activity_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `adoption_applications`
--
ALTER TABLE `adoption_applications`
  ADD CONSTRAINT `adoption_applications_ibfk_1` FOREIGN KEY (`adopter_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `adoption_applications_ibfk_2` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`adopter_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`shelter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
