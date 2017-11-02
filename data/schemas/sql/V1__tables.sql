# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.2.9-MariaDB-10.2.9+maria~jessie)
# Database: arrowdb
# Generation Time: 2017-10-10 08:43:34 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table archer
# ------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `arrowdb`;
USE arrowdb;

DROP TABLE IF EXISTS `archer`;

CREATE TABLE `archer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `dob` date NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table arrow
# ------------------------------------------------------------

DROP TABLE IF EXISTS `arrow`;

CREATE TABLE `arrow` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `archer` int(11) unsigned NOT NULL,
  `tournament` int(11) unsigned NOT NULL,
  `arrow` int(11) unsigned NOT NULL,
  `score` int(11) NOT NULL,
  `spider` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `arrow` (`arrow`,`archer`,`tournament`),
  KEY `archer` (`archer`),
  KEY `tournament` (`tournament`),
  CONSTRAINT `arrow_ibfk_1` FOREIGN KEY (`archer`) REFERENCES `archer` (`id`),
  CONSTRAINT `arrow_ibfk_2` FOREIGN KEY (`tournament`) REFERENCES `tournament` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table tournament
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tournament`;

CREATE TABLE `tournament` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `venue` varchar(255) NOT NULL DEFAULT '',
  `datetime_start` datetime NOT NULL,
  `datetime_end` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `arrows` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table tournament_archer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tournament_archer`;

CREATE TABLE `tournament_archer` (
  `tournament_id` int(11) unsigned NOT NULL,
  `archer_id` int(11) unsigned NOT NULL,
  KEY `tournament_id` (`tournament_id`,`archer_id`),
  KEY `tournament_archer_ibfk_2` (`archer_id`),
  CONSTRAINT `tournament_archer_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tournament_archer_ibfk_2` FOREIGN KEY (`archer_id`) REFERENCES `archer` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
