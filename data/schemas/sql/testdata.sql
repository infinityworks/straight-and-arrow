use arrowdb;

TRUNCATE TABLE `user`;
TRUNCATE TABLE `tournament_archer`;
TRUNCATE TABLE `prediction`;
TRUNCATE TABLE `arrow`;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE archer;
TRUNCATE TABLE tournament;
TRUNCATE TABLE player;
SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO `archer` (`id`, `name`, `dob`, `country`)
VALUES
	(1,'Rebecca Denyer','2010-10-21','UK'),
	(2,'John Abe James','1991-06-10','Spain'),
	(3,'Rowan Gill','1901-01-01','Jamaica'),
	(4,'Ivor Cheung','1959-02-03','Belgium');


INSERT INTO `tournament` (`id`, `venue`, `datetime_start`, `datetime_end`, `location`, `type`, `arrows`)
VALUES
	(1,'IW Board Room','2017-10-16 09:00:00','2017-12-13 17:45:00','Leeds','Portsmouth',60),
	(2,'Plaza de Espana','2018-08-01 00:00:00','2018-08-14 00:00:00','Barcelona','Portsmouth',60),
	(3,'Sydney Opera House','2019-09-08 00:00:00','2019-09-09 00:00:00','Sydney','Portsmouth',60),
	(4,'IW Event Space','2016-01-01 00:00:00','2016-01-01 00:00:00','Leeds','Portsmouth',60);


INSERT INTO `tournament_archer` (`tournament_id`, `archer_id`, `predictabool`)
VALUES
	(1,1,0),
	(1,2,1),
	(1,3,1),
	(1,4,1),
	(2,1,0),
	(2,3,0),
	(3,4,0),
	(4,1,0),
	(4,3,0);


INSERT INTO `user` (`id`, `name`, `email`)
VALUES
	(1,'JJ Beef','jj@beefdomain.com'),
	(2,'Ben Biscuit von Cheese Brunton','bbvcb@bruntmeister.com'),
	(3,'Donald Trump, POTUS','president@whitehouse.org'),
	(4,'R Cake','admin@cake.com');


INSERT INTO `arrow` (`id`, `archer`, `tournament`, `arrow`, `score`, `spider`)
VALUES
	(81,1,4,1,8,0),
	(82,1,4,2,4,0),
	(83,1,4,3,10,0),
	(84,1,4,4,5,0),
	(85,1,4,5,5,0),
	(86,1,4,6,5,0),
	(87,1,4,7,6,0),
	(88,1,4,8,9,0),
	(89,1,4,9,6,0),
	(90,1,4,10,9,0),
	(91,1,4,11,8,0),
	(92,1,4,12,6,0),
	(93,1,4,13,1,0),
	(94,1,4,14,4,0),
	(95,1,4,15,0,0),
	(96,1,4,16,2,0),
	(97,1,4,17,9,0),
	(98,1,4,18,6,0),
	(99,1,4,19,7,0),
	(100,1,4,20,6,0),
	(101,1,4,21,7,0),
	(102,1,4,22,4,0),
	(103,1,4,23,1,0),
	(104,1,4,24,7,0),
	(105,1,4,25,10,1),
	(106,1,4,26,1,0),
	(107,1,4,27,2,0),
	(108,1,4,28,4,0),
	(109,1,4,29,1,0),
	(110,1,4,30,2,0),
	(111,3,4,1,8,0),
	(112,3,4,2,0,0),
	(113,3,4,3,2,0),
	(114,3,4,4,10,1),
	(115,3,4,5,7,0),
	(116,3,4,6,9,0),
	(117,3,4,7,4,0),
	(118,3,4,8,3,0),
	(119,3,4,9,5,0),
	(120,3,4,10,5,0),
	(121,3,4,11,3,0),
	(122,3,4,12,5,0),
	(123,3,4,13,4,0),
	(124,3,4,14,4,0),
	(125,3,4,15,3,0),
	(126,3,4,16,7,0),
	(127,3,4,17,9,0),
	(128,3,4,18,3,0),
	(129,3,4,19,7,0),
	(130,3,4,20,1,0),
	(131,3,4,21,7,0),
	(132,3,4,22,5,0),
	(133,3,4,23,9,0),
	(134,3,4,24,4,0),
	(135,3,4,25,5,0),
	(136,3,4,26,6,0),
	(137,3,4,27,3,0),
	(138,3,4,28,0,0),
	(139,3,4,29,5,0),
	(140,3,4,30,3,0),
	(141,4,3,1,9,0),
	(142,4,3,2,5,0),
	(143,4,3,3,1,0),
	(144,4,3,4,10,1),
	(145,4,3,5,4,0),
	(146,4,3,6,8,0),
	(147,4,3,7,6,0),
	(148,4,3,8,10,0),
	(149,4,3,9,7,0),
	(150,4,3,10,10,0),
	(151,4,3,11,0,0),
	(152,4,3,12,6,0),
	(153,4,3,13,4,0),
	(154,4,3,14,4,0),
	(155,4,3,15,0,0),
	(156,4,3,16,4,0),
	(157,4,3,17,8,0),
	(158,4,3,18,6,0),
	(159,4,3,19,10,0),
	(160,4,3,20,9,0),
	(161,4,3,21,3,0),
	(162,4,3,22,4,0),
	(163,4,3,23,7,0),
	(164,4,3,24,9,0),
	(165,4,3,25,10,1),
	(166,4,3,26,4,0),
	(167,4,3,27,10,1),
	(168,4,3,28,8,0),
	(169,4,3,29,5,0),
	(170,4,3,30,1,0);


INSERT INTO `player` (`name`, `email`, `password`)
VALUES
	('one', 'one@one.one', '$2a$10$Olb6QEWU0DR3HRnxoyaVlujw73JSn45THGkHSpHSde90MHZaKTg2S'),
	('works', 'works@works.works', '$2a$10$srs00gQUBcBD4P9oONTPCuZAaY4b/6Y1D63bAORbFKSPv6u4Fkyjy');


INSERT INTO `prediction` (`player`, `tournament`, `archer`, `pred_score`)
VALUES
	(1, 1, 1, 200),
	(1, 1, 2, 201),
	(1, 1, 3, 202),
	(2, 1, 2, 180),
	(2, 1, 4, 276),
	(2, 1, 1, 95);
