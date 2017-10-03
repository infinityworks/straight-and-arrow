USE `arrowdb`;

DROP TABLE IF EXISTS `tournament`;
CREATE TABLE `tournament` (
  `venue` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `archer_name` varchar(45) DEFAULT NULL,
  `archer_address` varchar(45) DEFAULT NULL,
  `archer_dob` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tournament` WRITE;
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-09-20 10:00:00','2017-09-21 00:00:00','James Holdsworth','Leeds','1990-01-01 00:00:00');
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-09-20 10:00:00','2017-09-21 00:00:00','Ivor Cheung','Leeds','1994-01-01 00:00:00');
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-09-20 10:00:00','2017-09-21 00:00:00','Rowan Gill','Leeds','1994-01-02 00:00:00');
INSERT INTO `tournament` VALUES ('Manchester','Portsmouth','2017-09-20 10:00:00','2017-09-21 00:00:00','Rebecca Denwell','Leeds','1994-08-01 00:00:00');
INSERT INTO `tournament` VALUES ('Manchester','Portsmouth','2017-09-20 10:00:00','2017-09-21 00:00:00','John James','Leeds','1994-07-01 00:00:00');
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-10-05 10:00:00','2017-10-05 17:00:00','Clem Pickering','Leeds','1980-01-01 00:00:00');
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-10-05 10:00:00','2017-10-05 17:00:00','Dan Rathbone','Leeds','1982-01-01 00:00:00');
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-10-05 10:00:00','2017-10-05 17:00:00','Dan Brayshaw','Leeds','1983-01-01 00:00:00');
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-10-05 10:00:00','2017-10-05 17:00:00','Ed Marshall','Leeds','1984-01-01 00:00:00');
INSERT INTO `tournament` VALUES ('Leeds','Portsmouth','2017-10-05 10:00:00','2017-10-05 17:00:00','Ben Foster','Leeds','1988-01-01 00:00:00');
UNLOCK TABLES;
