--
-- Table structure for table `movie_snapshot`
--

CREATE TABLE `movie_snapshot` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `imdbid` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`imdbid`)
)
