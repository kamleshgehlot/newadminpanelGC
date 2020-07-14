-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2020 at 12:26 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `godconsciousness`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `email`, `address`, `mobile`, `is_active`, `created_at`) VALUES
(1, 'vijay@gmail.com', '010, Rupa  nagar 2', '09000500100', 1, '2020-06-08 06:22:20');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `module_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `module_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `website_link` varchar(1024) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `module_id`, `type`, `website_link`, `is_active`, `created_at`) VALUES
(1, 1, 'OBE', 'https://i.ytimg.com/vi/O_u4TV5Typs/sddefault.jpg', 1, '2020-07-12 09:54:09');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` blob,
  `token` varchar(255) DEFAULT NULL,
  `account_id` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `token`, `account_id`, `is_active`, `created_at`) VALUES
(1, 'Kamlesh', 'root', 0x41579e3d233189c2e2c3af45c10c96c5, 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ', 'IiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik', 1, '2020-03-03 09:32:09');

-- --------------------------------------------------------

--
-- Table structure for table `website_content`
--

CREATE TABLE `website_content` (
  `id` int(11) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `title` text,
  `content` text,
  `date` date DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `website_content`
--

INSERT INTO `website_content` (`id`, `type`, `title`, `content`, `date`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'OBE', '', 'Dear AllSharing my Out of Body Experience. I would like to share something peculiar. It has been 10 days and every night I seem to be getting similar visions. I see myself on the surface of a sea, standing without any support. There I notice a figure that seems to be 3 in 1.  The first figure is a very tall person who is dressed as a saint, has peculiarly long feet and fair skin, who I now recollect to have seen a couple of times. Second is my maternal Grandmother (Naani). The  Third is someone who I recall to be tall and thin with grey eyes. From 3 THEY merge into ONE. And now My Nani starts talking to me. SHE says, “Just look at the amount of ABUNDANCE that is here. It belongs to you. Take your share and go. Come, bring your buckets and fill it.”I pick up a bucket next to me and bend down to fill it with sea water- my share of abundance. As I look into the bucket, expecting water to collect in it, I notice something very different. It was being filled with STARS instead. There was one thing SHE kept repeating, “Take YOUR share. Don’t get swayed by what is in other’s bucket. There is ENOUGH for each one in this UNIVERSE. WE have  ample to give you all individually. Come and take your own!”SHE went on to explain, “What do WE mean by ‘Another’s bucket ’? It means, don’t see what others have and thereby want it for yourself just because they have it. If others have a better life, don’t resort to jealousy and crave theirs. Dont  say that you want what they have. DESIRE, Want, Ask anything, everything that you need because you feel for it. You really really want it for yourself... it could be more money, better relationships, good health, a better job, children having a great life, travel, jewels, clothes, food ..... anything!!!FOCUS on what You WANT and WHAT makes You HAPPY. DO NOT FEEL SAD. Don’t Ask out of ANXIETY, FEAR, LACK, PAUCITY.. FEEL GOOD and ASK.  THE  INTENT behind your Want or Desire -must be KIND, GOOD and RIGHT . Take your share of HAPPINESS; we have STARS for you too.”', '0000-00-00', 1, '2020-07-12 13:20:07', '2020-07-12 13:20:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `website_content`
--
ALTER TABLE `website_content`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `website_content`
--
ALTER TABLE `website_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
