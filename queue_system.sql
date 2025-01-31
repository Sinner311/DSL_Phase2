-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2025 at 07:34 AM
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
-- Database: `queue_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `dateid` int(11) NOT NULL,
  `roundid1` int(11) DEFAULT NULL,
  `roundid2` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `maxuser` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `starttime` time DEFAULT NULL,
  `endtime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`dateid`, `roundid1`, `roundid2`, `status`, `maxuser`, `date`, `starttime`, `endtime`) VALUES
(603, NULL, NULL, 'normal', 350, '2025-01-23', '08:30:00', '16:00:00'),
(604, NULL, NULL, 'normal', 350, '2025-01-24', '08:30:00', '16:00:00'),
(605, NULL, NULL, 'normal', 350, '2025-01-27', '08:30:00', '16:00:00'),
(606, NULL, NULL, 'normal', 350, '2025-01-28', '08:30:00', '16:00:00'),
(607, 39, 40, 'normal', 350, '2025-01-29', '08:30:00', '16:00:00'),
(608, 39, 40, 'normal', 6, '2025-01-30', '08:30:00', '16:00:00'),
(609, 41, 40, 'disable', 350, '2025-01-31', '08:30:00', '16:00:00'),
(610, 41, 40, 'normal', 350, '2025-02-03', '08:30:00', '16:00:00'),
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
(625, NULL, NULL, 'normal', 350, '2025-02-24', '08:30:00', '16:00:00'),
(626, NULL, NULL, 'normal', 350, '2025-02-25', '08:30:00', '16:00:00'),
(627, NULL, NULL, 'normal', 350, '2025-02-26', '08:30:00', '16:00:00'),
(628, NULL, NULL, 'normal', 350, '2025-02-27', '08:30:00', '16:00:00'),
(629, NULL, NULL, 'normal', 350, '2025-02-28', '08:30:00', '16:00:00'),
(630, NULL, NULL, 'normal', 350, '2025-03-03', '08:30:00', '16:00:00'),
(631, NULL, NULL, 'normal', 350, '2025-03-04', '08:30:00', '16:00:00'),
(632, NULL, NULL, 'normal', 350, '2025-03-05', '08:30:00', '16:00:00'),
(633, NULL, NULL, 'normal', 350, '2025-03-06', '08:30:00', '16:00:00'),
(634, NULL, NULL, 'normal', 350, '2025-03-07', '08:30:00', '16:00:00'),
(635, NULL, NULL, 'normal', 350, '2025-03-10', '08:30:00', '16:00:00'),
(636, NULL, NULL, 'normal', 350, '2025-03-11', '08:30:00', '16:00:00'),
(637, NULL, NULL, 'normal', 350, '2025-03-12', '08:30:00', '16:00:00'),
(638, NULL, NULL, 'normal', 350, '2025-03-13', '08:30:00', '16:00:00'),
(639, NULL, NULL, 'normal', 350, '2025-03-14', '08:30:00', '16:00:00'),
(640, NULL, NULL, 'normal', 350, '2025-03-17', '08:30:00', '16:00:00'),
(641, NULL, NULL, 'normal', 350, '2025-03-18', '08:30:00', '16:00:00'),
(642, NULL, NULL, 'normal', 350, '2025-03-19', '08:30:00', '16:00:00'),
(643, NULL, NULL, 'normal', 350, '2025-03-20', '08:30:00', '16:00:00'),
(644, NULL, NULL, 'normal', 350, '2025-03-21', '08:30:00', '16:00:00'),
(645, NULL, NULL, 'normal', 350, '2025-03-24', '08:30:00', '16:00:00'),
(646, NULL, NULL, 'normal', 350, '2025-03-25', '08:30:00', '16:00:00'),
(647, NULL, NULL, 'normal', 350, '2025-03-26', '08:30:00', '16:00:00'),
(648, NULL, NULL, 'normal', 350, '2025-03-27', '08:30:00', '16:00:00'),
(649, NULL, NULL, 'normal', 350, '2025-03-28', '08:30:00', '16:00:00'),
(650, NULL, NULL, 'normal', 350, '2025-03-31', '08:30:00', '16:00:00'),
(651, NULL, NULL, 'normal', 350, '2025-04-01', '08:30:00', '16:00:00'),
(652, NULL, NULL, 'normal', 350, '2025-04-02', '08:30:00', '16:00:00'),
(653, NULL, NULL, 'normal', 350, '2025-04-03', '08:30:00', '16:00:00'),
(654, NULL, NULL, 'normal', 350, '2025-04-04', '08:30:00', '16:00:00'),
(655, NULL, NULL, 'normal', 350, '2025-04-07', '08:30:00', '16:00:00'),
(656, NULL, NULL, 'normal', 350, '2025-04-08', '08:30:00', '16:00:00'),
(657, NULL, NULL, 'normal', 350, '2025-04-09', '08:30:00', '16:00:00'),
(658, NULL, NULL, 'normal', 350, '2025-04-10', '08:30:00', '16:00:00'),
(659, NULL, NULL, 'normal', 350, '2025-04-11', '08:30:00', '16:00:00'),
(660, NULL, NULL, 'normal', 350, '2025-04-14', '08:30:00', '16:00:00'),
(661, NULL, NULL, 'normal', 350, '2025-04-15', '08:30:00', '16:00:00'),
(662, NULL, NULL, 'normal', 350, '2025-04-16', '08:30:00', '16:00:00'),
(663, NULL, NULL, 'normal', 350, '2025-04-17', '08:30:00', '16:00:00'),
(664, NULL, NULL, 'normal', 350, '2025-04-18', '08:30:00', '16:00:00'),
(665, NULL, NULL, 'normal', 350, '2025-04-21', '08:30:00', '16:00:00'),
(666, NULL, NULL, 'normal', 350, '2025-04-22', '08:30:00', '16:00:00'),
(667, NULL, NULL, 'normal', 350, '2025-04-23', '08:30:00', '16:00:00'),
(668, NULL, NULL, 'normal', 350, '2025-04-24', '08:30:00', '16:00:00'),
(669, NULL, NULL, 'normal', 350, '2025-04-25', '08:30:00', '16:00:00'),
(670, NULL, NULL, 'normal', 350, '2025-04-28', '08:30:00', '16:00:00'),
(671, NULL, NULL, 'normal', 350, '2025-04-29', '08:30:00', '16:00:00'),
(672, NULL, NULL, 'normal', 350, '2025-04-30', '08:30:00', '16:00:00'),
(674, NULL, NULL, 'normal', 350, '2025-05-02', '08:30:00', '16:00:00'),
(675, NULL, NULL, 'normal', 350, '2025-05-05', '08:30:00', '16:00:00'),
(676, NULL, NULL, 'normal', 350, '2025-05-06', '08:30:00', '16:00:00'),
(677, NULL, NULL, 'normal', 350, '2025-05-07', '08:30:00', '16:00:00'),
(678, NULL, NULL, 'normal', 350, '2025-05-08', '08:30:00', '16:00:00'),
(679, NULL, NULL, 'normal', 350, '2025-05-09', '08:30:00', '16:00:00'),
(680, NULL, NULL, 'normal', 350, '2025-05-12', '08:30:00', '16:00:00'),
(683, NULL, NULL, 'normal', 350, '2025-05-15', '08:30:00', '16:00:00'),
(772, NULL, NULL, 'normal', 350, '2025-05-14', '08:30:00', '16:00:00'),
(774, NULL, NULL, 'normal', 350, '2025-05-16', '08:30:00', '16:00:00'),
(775, NULL, NULL, 'normal', 350, '2025-05-19', '08:30:00', '16:00:00'),
(776, NULL, NULL, 'normal', 350, '2025-05-20', '08:30:00', '16:00:00'),
(777, NULL, NULL, 'normal', 350, '2025-05-21', '08:30:00', '16:00:00'),
(2405, NULL, NULL, 'normal', 350, '2025-05-13', '08:30:00', '16:00:00'),
(3107, NULL, NULL, 'normal', 350, '2025-05-01', '08:30:00', '16:00:00'),
(3108, NULL, NULL, 'normal', 350, '2025-05-22', '08:30:00', '16:00:00'),
(3109, NULL, NULL, 'normal', 350, '2025-05-23', '08:30:00', '16:00:00'),
(3110, NULL, NULL, 'normal', 350, '2025-05-26', '08:30:00', '16:00:00'),
(3111, NULL, NULL, 'normal', 350, '2025-05-27', '08:30:00', '16:00:00'),
(3112, NULL, NULL, 'normal', 350, '2025-05-28', '08:30:00', '16:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `history_booking`
--

CREATE TABLE `history_booking` (
  `historyid` int(11) NOT NULL,
  `datetime` datetime DEFAULT current_timestamp(),
  `studentid` int(11) DEFAULT NULL,
  `bookingdateid` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_booking`
--

INSERT INTO `history_booking` (`historyid`, `datetime`, `studentid`, `bookingdateid`, `status`, `type`) VALUES
(15, '2025-01-30 19:21:50', NULL, 608, 'normal', 2),
(17, '2025-01-30 12:47:05', 12, 608, 'finish', 2),
(18, '2025-01-30 13:08:22', 12, 608, 'finish', 2);

-- --------------------------------------------------------

--
-- Table structure for table `history_queue`
--

CREATE TABLE `history_queue` (
  `historyid` int(11) NOT NULL,
  `datetime` datetime DEFAULT current_timestamp(),
  `studentid` int(11) DEFAULT NULL,
  `queueid` int(11) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `channel` tinyint(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `star_rate` varchar(11) DEFAULT NULL,
  `q1` varchar(3) DEFAULT NULL,
  `q2` varchar(3) DEFAULT NULL,
  `q3` varchar(3) DEFAULT NULL,
  `q4` varchar(3) DEFAULT NULL,
  `q5` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history_queue`
--

INSERT INTO `history_queue` (`historyid`, `datetime`, `studentid`, `queueid`, `type`, `channel`, `status`, `star_rate`, `q1`, `q2`, `q3`, `q4`, `q5`) VALUES
(1, '2025-01-31 03:46:59', 12, 16, 3, 3, 'finish', '5', '0', '0', '0', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `list_of_round`
--

CREATE TABLE `list_of_round` (
  `Listid` int(11) NOT NULL,
  `Document_Amendment_Submission_Date` varchar(20) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `semester` tinyint(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_of_round`
--

INSERT INTO `list_of_round` (`Listid`, `Document_Amendment_Submission_Date`, `year`, `semester`) VALUES
(1, NULL, '2022', 1),
(4, NULL, '2022', 2),
(5, NULL, '2022', 3),
(6, NULL, '2022', 4),
(7, NULL, '2022', 5);

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `queueid` int(11) NOT NULL,
  `time` time DEFAULT current_timestamp(),
  `studentid` int(11) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `channel` tinyint(20) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `queues`
--

INSERT INTO `queues` (`queueid`, `time`, `studentid`, `type`, `channel`, `status`) VALUES
(16, '03:46:24', 12, 3, NULL, 'FINISH'),
(17, '05:24:57', 12, 3, 3, 'CALLED');

-- --------------------------------------------------------

--
-- Table structure for table `rounds`
--

CREATE TABLE `rounds` (
  `roundid` int(11) NOT NULL,
  `startdate` date DEFAULT NULL,
  `enddate` date DEFAULT NULL,
  `Listid` int(11) DEFAULT NULL,
  `roundnumber` int(11) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rounds`
--

INSERT INTO `rounds` (`roundid`, `startdate`, `enddate`, `Listid`, `roundnumber`, `type`, `status`) VALUES
(39, '2025-01-29', '2025-01-30', 6, 1, 1, 'normal'),
(40, '2025-01-29', '2025-02-03', 6, 1, 2, 'normal'),
(41, '2025-01-31', '2025-02-03', 6, 2, 1, 'normal');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `studentid` varchar(10) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` enum('STUDENT','TEACHER','ADMIN') NOT NULL DEFAULT 'STUDENT',
  `channel` tinyint(20) DEFAULT NULL,
  `refresh` varchar(1046) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `studentid`, `name`, `role`, `channel`, `refresh`) VALUES
(1, 'nemopop148@gmail.com', NULL, 'JATESADA LEESUWAN', 'ADMIN', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5lbW9wb3AxNDhAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM4MzAzOTU4LCJleHAiOjE3MzgzOTAzNTh9.4EJu9XjFjSKWp4JiojOaAu7pbuYo_IHZjmJyZtTElxk'),
(11, 'pimsiri814@gmail.com', '6587864046', '', 'TEACHER', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBpbXNpcmk4MTRAZ21haWwuY29tIiwicm9sZSI6IlRFQUNIRVIiLCJpYXQiOjE3MzgxNDUyMjYsImV4cCI6MTczODIzMTYyNn0.VLFSdJ8bhie3RO8wIPw9YtZG6PKkopimWxvCFQto09M'),
(12, '6531501141@lamduan.mfu.ac.th', '6531501141', 'JATESADA LEESUWAN', 'STUDENT', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjY1MzE1MDExNDFAbGFtZHVhbi5tZnUuYWMudGgiLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTczODMwMTA5MCwiZXhwIjoxNzM4Mzg3NDkwfQ.zErPfjt7osJ-d2tDiFrVeE_oXp_BJ7T9K6CzZoK_ZAg');

-- --------------------------------------------------------

--
-- Table structure for table `web_settings`
--

CREATE TABLE `web_settings` (
  `id` int(11) NOT NULL,
  `web_status` varchar(20) NOT NULL,
  `show_list` int(11) DEFAULT NULL,
  `web_break_text` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_settings`
--

INSERT INTO `web_settings` (`id`, `web_status`, `show_list`, `web_break_text`) VALUES
(1, 'normal', 5, 'พักเบรคถึง 13:00 น.');

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
  MODIFY `dateid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3113;

--
-- AUTO_INCREMENT for table `history_booking`
--
ALTER TABLE `history_booking`
  MODIFY `historyid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `history_queue`
--
ALTER TABLE `history_queue`
  MODIFY `historyid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `list_of_round`
--
ALTER TABLE `list_of_round`
  MODIFY `Listid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `queueid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `rounds`
--
ALTER TABLE `rounds`
  MODIFY `roundid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `web_settings`
--
ALTER TABLE `web_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `history_queue_ibfk_2` FOREIGN KEY (`queueid`) REFERENCES `queues` (`queueid`),
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
