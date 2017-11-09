USE arrowdb;
CREATE TABLE IF NOT EXISTS `prediction` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pred_no` int(1) unsigned NOT NULL,
  `player` int(11) unsigned NOT NULL,
  `tournament` int(11) unsigned NOT NULL,
  `archer` int(11) unsigned NOT NULL,
  `pred_score` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pred_no` (`pred_no`,`player`,`tournament`),
  KEY `archer` (`archer`),
  KEY `tournament` (`tournament`),
  KEY `player` (`player`),
  CONSTRAINT `pred_ibfk_1` FOREIGN KEY (`player`) REFERENCES `player` (`id`),
  CONSTRAINT `pred_ibfk_2` FOREIGN KEY (`tournament`) REFERENCES `tournament` (`id`),
  CONSTRAINT `pred_ibfk_3` FOREIGN KEY (`archer`) REFERENCES `archer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
