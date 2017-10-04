# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.2.9-MariaDB-10.2.9+maria~jessie)
# Database: arrowdb
# Generation Time: 2017-10-04 13:50:09 +0000
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

LOCK TABLES `archer` WRITE;
/*!40000 ALTER TABLE `archer` DISABLE KEYS */;

INSERT INTO `archer` (`id`, `name`, `dob`, `country`)
VALUES
	(1,'Rebecca Denyer','2010-10-21','UK'),
	(2,'John Abe James','1991-06-10','Spain'),
	(3,'Rowan Gill','1901-01-01','Jamaica'),
	(4,'Ivor Cheung','1959-02-03','Belgium');

/*!40000 ALTER TABLE `archer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tournament
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tournament`;

CREATE TABLE `tournament` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `venue` varchar(255) NOT NULL DEFAULT '',
  `datetime_start` datetime NOT NULL,
  `datetime_end` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

LOCK TABLES `tournament` WRITE;
/*!40000 ALTER TABLE `tournament` DISABLE KEYS */;

INSERT INTO `tournament` (`id`, `venue`, `datetime_start`, `datetime_end`, `location`)
VALUES
	(1,'IW Board Room','2017-12-12 09:00:00','2017-12-13 17:45:00','Leeds'),
	(2,'Plaza de Espana','2018-08-01 00:00:00','2018-08-14 00:00:00','Barcelona'),
	(3,'Sydney Opera House','2019-09-08 00:00:00','2019-09-09 00:00:00','Sydney'),
	(4,'IW Event Space','2016-01-01 00:00:00','2016-01-01 00:00:00','Leeds');

/*!40000 ALTER TABLE `tournament` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tournament_archer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tournament_archer`;

CREATE TABLE `tournament_archer` (
  `tournament_id` int(11) unsigned NOT NULL,
  `archer_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`tournament_id`),
  KEY `archer_id` (`archer_id`),
  CONSTRAINT `tournament_archer_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tournament_archer_ibfk_2` FOREIGN KEY (`archer_id`) REFERENCES `archer` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
