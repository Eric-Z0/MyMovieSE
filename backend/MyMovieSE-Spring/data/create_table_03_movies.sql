--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `actors` varchar(255) DEFAULT NULL,
  `awards` varchar(255) DEFAULT NULL,
  `box_office` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `dvd` varchar(50) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `imdbid` varchar(255) DEFAULT NULL,
  `rating` varchar(20) DEFAULT NULL,
  `imdb_votes` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `metascore` varchar(20) DEFAULT NULL,
  `plot` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `production` varchar(255) DEFAULT NULL,
  `rated` varchar(50) DEFAULT NULL,
  `released` varchar(255) DEFAULT NULL,
  `reponse` varchar(20) DEFAULT NULL,
  `runtime` varchar(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `writer` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`imdbid`)
)
