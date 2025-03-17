-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 10, 2025 at 07:43 AM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `queue_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `dateid` int NOT NULL,
  `roundid1` int DEFAULT NULL,
  `roundid2` int DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `maxuser` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`dateid`, `roundid1`, `roundid2`, `status`, `maxuser`, `date`, `starttime`, `endtime`) VALUES
(608, NULL, NULL, 'normal', 6, '2025-01-30', '08:30:00', '16:00:00'),
(609, NULL, NULL, 'disable', 350, '2025-01-31', '08:30:00', '16:00:00'),
(610, NULL, NULL, 'normal', 350, '2025-02-03', '08:30:00', '16:00:00'),
(611, NULL, NULL, 'normal', 350, '2025-02-04', '08:30:00', '16:00:00'),
(612, NULL, NULL, 'normal', 350, '2025-02-05', '08:30:00', '16:00:00'),
(613, NULL, NULL, 'normal', 350, '2025-02-06', '08:30:00', '16:00:00'),
(614, NULL, NULL, 'disable', 350, '2025-02-07', '08:30:00', '16:00:00'),
(615, NULL, NULL, 'normal', 350, '2025-02-10', '08:30:00', '16:00:00'),
(616, NULL, NULL, 'normal', 350, '2025-02-11', '08:30:00', '16:00:00'),
(617, NULL, NULL, 'normal', 350, '2025-02-12', '08:30:00', '16:00:00'),
(618, NULL, NULL, 'normal', 350, '2025-02-13', '08:30:00', '16:00:00'),
(619, NULL, NULL, 'normal', 350, '2025-02-14', '08:30:00', '16:00:00'),
(620, NULL, NULL, 'normal', 350, '2025-02-17', '08:30:00', '16:00:00'),
(621, NULL, NULL, 'normal', 350, '2025-02-18', '08:30:00', '16:00:00'),
(622, NULL, NULL, 'normal', 350, '2025-02-19', '08:30:00', '16:00:00'),
(623, NULL, NULL, 'normal', 350, '2025-02-20', '08:30:00', '16:00:00'),
(624, NULL, NULL, 'normal', 350, '2025-02-21', '08:30:00', '16:00:00'),
(625, NULL, NULL, 'normal', 2, '2025-02-24', '08:30:00', '16:00:00'),
(626, NULL, NULL, 'normal', 350, '2025-02-25', '08:30:00', '16:00:00'),
(627, NULL, NULL, 'normal', 350, '2025-02-26', '08:30:00', '16:00:00'),
(628, NULL, NULL, 'normal', 350, '2025-02-27', '08:30:00', '16:00:00'),
(629, NULL, NULL, 'normal', 350, '2025-02-28', '08:30:00', '16:00:00'),
(630, NULL, NULL, 'normal', 0, '2025-03-03', '08:30:00', '16:00:00'),
(631, NULL, NULL, 'normal', 100, '2025-03-04', '08:30:00', '16:00:00'),
(632, NULL, NULL, 'normal', 350, '2025-03-05', '08:30:00', '16:00:00'),
(633, NULL, NULL, 'normal', 350, '2025-03-06', '08:30:00', '16:00:00'),
(634, NULL, NULL, 'normal', 350, '2025-03-07', '08:30:00', '16:00:00'),
(3133, NULL, NULL, 'normal', 400, '2025-03-10', '08:30:00', '16:00:00'),
(3134, NULL, NULL, 'normal', 400, '2025-03-11', '08:30:00', '16:00:00'),
(3135, NULL, NULL, 'normal', 400, '2025-03-12', '08:30:00', '16:00:00'),
(3136, NULL, NULL, 'normal', 400, '2025-03-13', '08:30:00', '16:00:00'),
(3137, NULL, NULL, 'normal', 400, '2025-03-14', '08:30:00', '16:00:00'),
(3138, NULL, NULL, 'normal', 400, '2025-03-17', '08:30:00', '16:00:00'),
(3139, NULL, NULL, 'normal', 400, '2025-03-18', '08:30:00', '16:00:00'),
(3140, NULL, NULL, 'normal', 400, '2025-03-19', '08:30:00', '16:00:00'),
(3141, NULL, NULL, 'normal', 400, '2025-03-20', '08:30:00', '16:00:00'),
(3142, NULL, NULL, 'normal', 400, '2025-03-21', '08:30:00', '16:00:00'),
(3143, NULL, NULL, 'normal', 400, '2025-03-24', '08:30:00', '16:00:00'),
(3144, NULL, NULL, 'normal', 400, '2025-03-25', '08:30:00', '16:00:00'),
(3145, NULL, NULL, 'normal', 400, '2025-03-26', '08:30:00', '16:00:00'),
(3146, NULL, NULL, 'normal', 400, '2025-03-27', '08:30:00', '16:00:00'),
(3147, NULL, NULL, 'normal', 400, '2025-03-28', '08:30:00', '16:00:00'),
(3148, NULL, NULL, 'normal', 400, '2025-03-31', '08:30:00', '16:00:00'),
(3149, NULL, NULL, 'normal', 400, '2025-04-01', '08:30:00', '16:00:00'),
(3150, NULL, NULL, 'normal', 400, '2025-04-02', '08:30:00', '16:00:00'),
(3151, NULL, NULL, 'normal', 400, '2025-04-03', '08:30:00', '16:00:00'),
(3152, NULL, NULL, 'normal', 400, '2025-04-04', '08:30:00', '16:00:00'),
(3153, NULL, NULL, 'normal', 400, '2025-04-07', '08:30:00', '16:00:00'),
(3154, NULL, NULL, 'normal', 400, '2025-04-08', '08:30:00', '16:00:00'),
(3155, NULL, NULL, 'normal', 400, '2025-04-09', '08:30:00', '16:00:00'),
(3156, NULL, NULL, 'normal', 400, '2025-04-10', '08:30:00', '16:00:00'),
(3157, NULL, NULL, 'normal', 400, '2025-04-11', '08:30:00', '16:00:00'),
(3158, NULL, NULL, 'normal', 400, '2025-04-14', '08:30:00', '16:00:00'),
(3159, NULL, NULL, 'normal', 400, '2025-04-15', '08:30:00', '16:00:00'),
(3160, NULL, NULL, 'normal', 400, '2025-04-16', '08:30:00', '16:00:00'),
(3161, NULL, NULL, 'normal', 400, '2025-04-17', '08:30:00', '16:00:00'),
(3162, NULL, NULL, 'normal', 400, '2025-04-18', '08:30:00', '16:00:00'),
(3163, NULL, NULL, 'normal', 400, '2025-04-21', '08:30:00', '16:00:00'),
(3164, NULL, NULL, 'normal', 400, '2025-04-22', '08:30:00', '16:00:00'),
(3165, NULL, NULL, 'normal', 400, '2025-04-23', '08:30:00', '16:00:00'),
(3166, NULL, NULL, 'normal', 400, '2025-04-24', '08:30:00', '16:00:00'),
(3167, NULL, NULL, 'normal', 400, '2025-04-25', '08:30:00', '16:00:00'),
(3168, NULL, NULL, 'normal', 400, '2025-04-28', '08:30:00', '16:00:00'),
(3169, NULL, NULL, 'normal', 400, '2025-04-29', '08:30:00', '16:00:00'),
(3170, NULL, NULL, 'normal', 400, '2025-04-30', '08:30:00', '16:00:00'),
(3171, NULL, NULL, 'normal', 400, '2025-05-01', '08:30:00', '16:00:00'),
(3172, NULL, NULL, 'normal', 400, '2025-05-02', '08:30:00', '16:00:00'),
(3173, NULL, NULL, 'normal', 400, '2025-05-05', '08:30:00', '16:00:00'),
(3174, NULL, NULL, 'normal', 400, '2025-05-06', '08:30:00', '16:00:00'),
(3175, NULL, NULL, 'normal', 400, '2025-05-07', '08:30:00', '16:00:00'),
(3176, NULL, NULL, 'normal', 400, '2025-05-08', '08:30:00', '16:00:00'),
(3177, NULL, NULL, 'normal', 400, '2025-05-09', '08:30:00', '16:00:00'),
(3178, NULL, NULL, 'normal', 400, '2025-05-12', '08:30:00', '16:00:00'),
(3179, NULL, NULL, 'normal', 400, '2025-05-13', '08:30:00', '16:00:00'),
(3180, NULL, NULL, 'normal', 400, '2025-05-14', '08:30:00', '16:00:00'),
(3181, NULL, NULL, 'normal', 400, '2025-05-15', '08:30:00', '16:00:00'),
(3182, NULL, NULL, 'normal', 400, '2025-05-16', '08:30:00', '16:00:00'),
(3183, NULL, NULL, 'normal', 400, '2025-05-19', '08:30:00', '16:00:00'),
(3184, NULL, NULL, 'normal', 400, '2025-05-20', '08:30:00', '16:00:00'),
(3185, NULL, NULL, 'normal', 400, '2025-05-21', '08:30:00', '16:00:00'),
(3186, NULL, NULL, 'normal', 400, '2025-05-22', '08:30:00', '16:00:00'),
(3187, NULL, NULL, 'normal', 400, '2025-05-23', '08:30:00', '16:00:00'),
(3188, NULL, NULL, 'normal', 400, '2025-05-26', '08:30:00', '16:00:00'),
(3189, NULL, NULL, 'normal', 400, '2025-05-27', '08:30:00', '16:00:00'),
(3190, NULL, NULL, 'normal', 400, '2025-05-28', '08:30:00', '16:00:00'),
(3191, NULL, NULL, 'normal', 400, '2025-05-29', '08:30:00', '16:00:00'),
(3192, NULL, NULL, 'normal', 400, '2025-05-30', '08:30:00', '16:00:00'),
(3193, NULL, NULL, 'normal', 400, '2025-06-02', '08:30:00', '16:00:00'),
(3194, NULL, NULL, 'normal', 400, '2025-06-03', '08:30:00', '16:00:00'),
(3195, NULL, NULL, 'normal', 400, '2025-06-04', '08:30:00', '16:00:00'),
(3196, NULL, NULL, 'normal', 400, '2025-06-05', '08:30:00', '16:00:00'),
(3197, NULL, NULL, 'normal', 400, '2025-06-06', '08:30:00', '16:00:00'),
(3198, NULL, NULL, 'normal', 400, '2025-06-09', '08:30:00', '16:00:00'),
(3199, NULL, NULL, 'normal', 400, '2025-06-10', '08:30:00', '16:00:00'),
(3200, NULL, NULL, 'normal', 400, '2025-06-11', '08:30:00', '16:00:00'),
(3201, NULL, NULL, 'normal', 400, '2025-06-12', '08:30:00', '16:00:00'),
(3202, NULL, NULL, 'normal', 400, '2025-06-13', '08:30:00', '16:00:00'),
(3203, NULL, NULL, 'normal', 400, '2025-06-16', '08:30:00', '16:00:00'),
(3204, NULL, NULL, 'normal', 400, '2025-06-17', '08:30:00', '16:00:00'),
(3205, NULL, NULL, 'normal', 400, '2025-06-18', '08:30:00', '16:00:00'),
(3206, NULL, NULL, 'normal', 400, '2025-06-19', '08:30:00', '16:00:00'),
(3207, NULL, NULL, 'normal', 400, '2025-06-20', '08:30:00', '16:00:00'),
(3208, NULL, NULL, 'normal', 400, '2025-06-23', '08:30:00', '16:00:00'),
(3209, NULL, NULL, 'normal', 400, '2025-06-24', '08:30:00', '16:00:00'),
(3210, NULL, NULL, 'normal', 400, '2025-06-25', '08:30:00', '16:00:00'),
(3211, NULL, NULL, 'normal', 400, '2025-06-26', '08:30:00', '16:00:00'),
(3212, NULL, NULL, 'normal', 400, '2025-06-27', '08:30:00', '16:00:00'),
(3213, NULL, NULL, 'normal', 400, '2025-06-30', '08:30:00', '16:00:00'),
(3214, NULL, NULL, 'normal', 400, '2025-07-01', '08:30:00', '16:00:00'),
(3215, NULL, NULL, 'normal', 400, '2025-07-02', '08:30:00', '16:00:00'),
(3216, NULL, NULL, 'normal', 400, '2025-07-03', '08:30:00', '16:00:00'),
(3217, NULL, NULL, 'normal', 400, '2025-07-04', '08:30:00', '16:00:00'),
(3218, NULL, NULL, 'normal', 400, '2025-07-07', '08:30:00', '16:00:00'),
(3219, NULL, NULL, 'normal', 400, '2025-07-08', '08:30:00', '16:00:00'),
(3220, NULL, NULL, 'normal', 400, '2025-07-09', '08:30:00', '16:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `history_booking`
--

CREATE TABLE `history_booking` (
  `historyid` int NOT NULL,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `studentid` int DEFAULT NULL,
  `bookingdateid` int DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_booking`
--

INSERT INTO `history_booking` (`historyid`, `datetime`, `studentid`, `bookingdateid`, `status`, `type`) VALUES
(15, '2025-01-30 19:21:50', NULL, 608, 'cancel', 2),
(17, '2025-01-30 12:47:05', 12, 608, 'cancel', 2),
(18, '2025-01-30 13:08:22', 12, 622, 'cancel', 2),
(25, '2025-02-20 07:56:02', 12, 623, 'finish', 2),
(33, '2025-02-26 06:58:53', 12, 631, 'normal', 2);

-- --------------------------------------------------------

--
-- Table structure for table `history_queue`
--

CREATE TABLE `history_queue` (
  `historyid` int NOT NULL,
  `datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `studentid` int DEFAULT NULL,
  `queueid` int DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `channel` tinyint DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `star_rate` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_queue`
--

INSERT INTO `history_queue` (`historyid`, `datetime`, `studentid`, `queueid`, `type`, `channel`, `status`, `star_rate`) VALUES
(3, '2025-02-10 09:00:51', 12, 18, 2, 3, 'finish', '3'),
(4, '2025-02-20 09:14:19', 12, 1, 3, 3, 'finish', '5'),
(5, '2025-02-20 09:20:33', 12, 2, 1, 3, 'finish', '5'),
(6, '2025-02-20 10:51:16', 12, 3, 3, 3, 'finish', '5'),
(7, '2025-02-20 15:04:54', 12, 5, 3, 1, 'finish', '5'),
(8, '2025-02-20 15:38:44', 12, 7, 3, 1, 'finish', '1'),
(9, '2025-02-26 06:57:39', 12, 1, 3, 1, 'finish', '5'),
(10, '2025-02-26 07:01:33', 12, 2, 3, 1, 'finish', '5');

-- --------------------------------------------------------

--
-- Table structure for table `list_of_round`
--

CREATE TABLE `list_of_round` (
  `Listid` int NOT NULL,
  `Document_Amendment_Submission_Date` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `year` year DEFAULT NULL,
  `semester` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_of_round`
--

INSERT INTO `list_of_round` (`Listid`, `Document_Amendment_Submission_Date`, `year`, `semester`) VALUES
(9, NULL, '2024', 1);

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `queueid` int NOT NULL,
  `queue_no` varchar(6) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `studentid` int DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `channel` tinyint DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rounds`
--

CREATE TABLE `rounds` (
  `roundid` int NOT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `Listid` int DEFAULT NULL,
  `roundnumber` int DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `studentid` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('STUDENT','ADMIN') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'STUDENT',
  `channel` tinyint DEFAULT NULL,
  `refresh` varchar(1046) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `studentid`, `name`, `role`, `channel`, `refresh`) VALUES
(1, 'nemopop148@gmail.com', NULL, 'JATESADA LEESUWAN', 'ADMIN', 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5lbW9wb3AxNDhAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQxNTkyMDMwLCJleHAiOjE3NDE2Nzg0MzB9.bbFMikxpLQVBO3FVBeVyL-ak1G73seF8Nams1IdW0Vs'),
(2, 'bawornluk18@gmail.com', NULL, 'John Cena', 'ADMIN', 5, NULL),
(3, 'pasupat39786@gmail.com', NULL, 'Ohm หล่อเท่', 'ADMIN', 3, NULL),
(11, 'pimsiri814@gmail.com', '6587864046', '', 'ADMIN', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbXNpcmk4MTRAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQwMDU3OTk5LCJleHAiOjE3NDAxNDQzOTl9.Ei4FwLHFjd3Ai43rARXj9JSSzi4LAXiMNgvW7ZN9YIk'),
(12, '6531501141@lamduan.mfu.ac.th', '6531501141', 'JATESADA LEESUWAN', 'STUDENT', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjY1MzE1MDExNDFAbGFtZHVhbi5tZnUuYWMudGgiLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTc0MTU4Nzg3NSwiZXhwIjoxNzQxNjc0Mjc1fQ.ejo4TLKU6EGjUOX0fSI4DDb7YmFXFX9-whjdwu4KDCc'),
(13, 'thariya.aon@mfu.ac.th', '3397301220', '', 'ADMIN', 1, NULL),
(14, 'boosaya.cha@mfu.ac.th', '2738279570', '', 'ADMIN', 2, NULL),
(15, 'chanaporn.kun@mfu.ac.th', '7214886732', '', 'ADMIN', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `web_settings`
--

CREATE TABLE `web_settings` (
  `id` int NOT NULL,
  `web_status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `show_list` int DEFAULT NULL,
  `web_break_text` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_settings`
--

INSERT INTO `web_settings` (`id`, `web_status`, `show_list`, `web_break_text`) VALUES
(1, 'disable', 9, 'ระบบปิดพักเบรคถึง 13:00 น.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`dateid`),
  ADD UNIQUE KEY `date` (`date`),
  ADD KEY `roundid` (`roundid1`),
  ADD KEY `roundid2` (`roundid2`);

--
-- Indexes for table `history_booking`
--
ALTER TABLE `history_booking`
  ADD PRIMARY KEY (`historyid`),
  ADD KEY `bookingdateid` (`bookingdateid`),
  ADD KEY `studentid` (`studentid`);

--
-- Indexes for table `history_queue`
--
ALTER TABLE `history_queue`
  ADD PRIMARY KEY (`historyid`),
  ADD KEY `studentid` (`studentid`),
  ADD KEY `queueid` (`queueid`);

--
-- Indexes for table `list_of_round`
--
ALTER TABLE `list_of_round`
  ADD PRIMARY KEY (`Listid`);

--
-- Indexes for table `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`queueid`),
  ADD KEY `studentid` (`studentid`);

--
-- Indexes for table `rounds`
--
ALTER TABLE `rounds`
  ADD PRIMARY KEY (`roundid`),
  ADD KEY `Listid` (`Listid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `studentid` (`studentid`);

--
-- Indexes for table `web_settings`
--
ALTER TABLE `web_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `show_list` (`show_list`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `dateid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3221;

--
-- AUTO_INCREMENT for table `history_booking`
--
ALTER TABLE `history_booking`
  MODIFY `historyid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `history_queue`
--
ALTER TABLE `history_queue`
  MODIFY `historyid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `list_of_round`
--
ALTER TABLE `list_of_round`
  MODIFY `Listid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `queueid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rounds`
--
ALTER TABLE `rounds`
  MODIFY `roundid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `web_settings`
--
ALTER TABLE `web_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `days`
--
ALTER TABLE `days`
  ADD CONSTRAINT `days_ibfk_1` FOREIGN KEY (`roundid1`) REFERENCES `rounds` (`roundid`),
  ADD CONSTRAINT `days_ibfk_2` FOREIGN KEY (`roundid2`) REFERENCES `rounds` (`roundid`);

--
-- Constraints for table `history_booking`
--
ALTER TABLE `history_booking`
  ADD CONSTRAINT `history_booking_ibfk_2` FOREIGN KEY (`bookingdateid`) REFERENCES `days` (`dateid`),
  ADD CONSTRAINT `history_booking_ibfk_3` FOREIGN KEY (`studentid`) REFERENCES `users` (`id`);

--
-- Constraints for table `history_queue`
--
ALTER TABLE `history_queue`
  ADD CONSTRAINT `history_queue_ibfk_3` FOREIGN KEY (`studentid`) REFERENCES `users` (`id`);

--
-- Constraints for table `queues`
--
ALTER TABLE `queues`
  ADD CONSTRAINT `queues_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `users` (`id`);

--
-- Constraints for table `rounds`
--
ALTER TABLE `rounds`
  ADD CONSTRAINT `rounds_ibfk_1` FOREIGN KEY (`Listid`) REFERENCES `list_of_round` (`Listid`);

--
-- Constraints for table `web_settings`
--
ALTER TABLE `web_settings`
  ADD CONSTRAINT `web_settings_ibfk_1` FOREIGN KEY (`show_list`) REFERENCES `list_of_round` (`Listid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
