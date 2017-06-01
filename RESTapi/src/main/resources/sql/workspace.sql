-- MySQL dump 10.13  Distrib 5.5.23, for Win64 (x86)
--
-- Host: localhost    Database: workspace
-- ------------------------------------------------------
-- Server version	5.5.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contacts_1_idx` (`user_id`),
  KEY `fk_contacts_2_idx` (`contact_id`),
  CONSTRAINT `fk_contacts_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_contacts_2` FOREIGN KEY (`contact_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (48,799,3),(49,799,793),(50,799,798),(57,798,799),(60,798,796),(66,798,801),(72,798,794),(73,792,801),(74,792,802),(75,792,800),(79,803,3),(80,803,802),(81,803,800),(82,803,792);
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `label`
--

DROP TABLE IF EXISTS `label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `colourId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_idx` (`projectId`),
  CONSTRAINT `project` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label`
--

LOCK TABLES `label` WRITE;
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
INSERT INTO `label` VALUES (43,'ukh',2,69),(44,'iuiuk',2,69),(45,'6767',5,69),(46,'',3,69),(47,'5656',2,69),(48,'456456',3,69),(49,'rtt',1,68),(50,'1414',2,69);
/*!40000 ALTER TABLE `label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labeltasks`
--

DROP TABLE IF EXISTS `labeltasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `labeltasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `labelId` int(11) NOT NULL,
  `taskId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `label_idx` (`labelId`),
  KEY `task_idx` (`taskId`),
  CONSTRAINT `label` FOREIGN KEY (`labelId`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labeltasks`
--

LOCK TABLES `labeltasks` WRITE;
/*!40000 ALTER TABLE `labeltasks` DISABLE KEYS */;
INSERT INTO `labeltasks` VALUES (151,43,47),(152,44,47),(153,45,47),(154,45,48),(155,44,46),(156,44,48),(157,49,44);
/*!40000 ALTER TABLE `labeltasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `number_of_tasks` int(11) DEFAULT '0',
  `number_of_completed_tasks` int(11) DEFAULT '0',
  `number_of_users` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_project_1_idx` (`user_id`),
  CONSTRAINT `fk_project_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (63,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',793,3,1,2),(64,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',794,3,1,2),(65,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',795,3,1,2),(66,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',796,3,1,2),(67,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',797,3,1,2),(68,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',798,3,1,2),(69,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',799,5,2,3),(70,'Первый проект','Это ваш первый проект, в котором вы являетесь администратором. Для открытия проекта щелкните по его названию',803,3,1,5),(75,'6666666',NULL,792,NULL,NULL,3),(76,'7777','777',792,NULL,NULL,1),(77,'333','333',792,NULL,NULL,1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `maker_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `maker` (`maker_id`),
  KEY `project` (`project_id`),
  CONSTRAINT `fk_task_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_task_user` FOREIGN KEY (`maker_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (28,'Задача номер Раз','Чужая выполненная задача',3,63,1),(29,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',793,63,0),(30,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',NULL,63,0),(31,'Задача номер Раз','Чужая выполненная задача',3,64,1),(32,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',794,64,0),(33,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',NULL,64,0),(34,'Задача номер Раз','Чужая выполненная задача',3,65,1),(35,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',795,65,0),(36,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',NULL,65,0),(37,'Задача номер Раз','Чужая выполненная задача',3,66,1),(38,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',796,66,0),(39,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',NULL,66,0),(40,'Задача номер Раз','Чужая выполненная задача',3,67,1),(41,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',797,67,0),(42,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',NULL,67,0),(43,'Задача номер Раз','Чужая выполненная задача',3,68,1),(44,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',3,68,0),(45,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',NULL,68,0),(46,'Задача номер Раз','Чужая выполненная задача',799,69,0),(47,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',799,69,0),(48,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',798,69,1),(49,'123123','123123123',3,69,1),(50,'etrd','rdtrdt',798,69,0),(51,'Задача номер Раз','Чужая выполненная задача',3,70,1),(52,'Задача номер Два','Это ваша задача (вы за ней закреплены). Сделайте задачу \"выполненной\"(с помощью меню вправом верхнем углу текущего окна)',803,70,0),(53,'Задача номер Три','Это свободная задача. Закрепитесь за ней ивыполните её',792,70,0);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `workspace`.`task_AFTER_INSERT` AFTER INSERT ON `task` FOR EACH ROW
BEGIN
SET @count_completed =
    (select count('id') from task where completed = 1 AND project_id = NEW.project_id);
    SET @count_tasks =
    (select count(`id`) from task where project_id = NEW.project_id);
    update project set number_of_completed_tasks = @count_completed where project.id = new.project_id;
    update project set number_of_tasks = @count_tasks where project.id = NEW.project_id;
	SET @count_user_tasks =
	(select count('id') from task where maker_id = NEW.maker_id);
	update user_profile set number_of_tasks = @count_user_tasks where user_profile.user_id = new.maker_id;
	SET @count_user_completed_tasks =
	(select count('id') from task where completed = 1 AND maker_id = NEW.maker_id);
	update user_profile set number_of_completed_tasks = @count_user_completed_tasks where user_profile.user_id = new.maker_id;	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `workspace`.`task_AFTER_UPDATE` AFTER UPDATE ON `task` FOR EACH ROW
BEGIN
	SET @count_completed =
    (select count('id') from task where completed = 1 AND project_id = NEW.project_id);
    SET @count_tasks =
    (select count(`id`) from task where project_id = NEW.project_id);
    update project set number_of_completed_tasks = @count_completed where project.id = new.project_id;
    update project set number_of_tasks = @count_tasks where project.id = NEW.project_id;
	SET @count_user_tasks =
	(select count('id') from task where maker_id = NEW.maker_id);
	update user_profile set number_of_tasks = @count_user_tasks where user_profile.user_id = new.maker_id;
	SET @count_user_completed_tasks =
	(select count('id') from task where  completed = 1 AND maker_id = NEW.maker_id);
	update user_profile set number_of_completed_tasks = @count_user_completed_tasks where user_profile.user_id = new.maker_id;	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `workspace`.`task_AFTER_DELETE` AFTER DELETE ON `task` FOR EACH ROW
BEGIN
SET @count_completed =
    (select count('id') from task where completed = 1 AND project_id = OLD.project_id);
    SET @count_tasks =
    (select count(`id`) from task where project_id = OLD.project_id);
    update project set number_of_completed_tasks = @count_completed where project.id = OLD.project_id;
    update project set number_of_tasks = @count_tasks where project.id = OLD.project_id;
	SET @count_user_tasks =
	(select count('id') from task where maker_id = OLD.maker_id);
	update user_profile set number_of_tasks = @count_user_tasks where user_profile.user_id = old.maker_id;
	SET @count_user_completed_tasks =
	(select count('id') from task where  completed = 1 AND maker_id = OLD.maker_id);
	update user_profile set number_of_completed_tasks = @count_user_completed_tasks where user_profile.user_id = old.maker_id;	

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_team_project_idx` (`project_id`),
  KEY `fk_team_user_idx` (`user_id`),
  CONSTRAINT `fk_team_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_team_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (57,63,793),(58,63,3),(59,64,794),(60,64,3),(61,65,795),(62,65,3),(63,66,796),(64,66,3),(65,67,797),(66,67,3),(67,68,798),(68,68,3),(69,69,799),(87,69,3),(89,69,798),(90,70,803),(91,70,3),(92,70,802),(93,70,800),(94,70,792),(102,75,792),(103,75,801),(104,76,792),(105,77,792),(109,75,802);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `workspace`.`team_AFTER_INSERT` AFTER INSERT ON `team` FOR EACH ROW
BEGIN
	UPDATE `project` SET number_of_users = 
    (select count(id) from team where project_id = NEW.project_id)
    where id = NEW.project_id;
	SET @count_user_project =
	(select count('id') from team where user_id = NEW.user_id);
	update user_profile set number_of_projects = @count_user_project where user_profile.user_id = new.user_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `workspace`.`team_AFTER_DELETE` AFTER DELETE ON `team` FOR EACH ROW
BEGIN
	UPDATE `project` SET number_of_users = 
    (select count(id) from team where project_id = OLD.project_id)
    where id = OLD.project_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `lifetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk_token_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (25,794,'iWeXyY9tqqRPFXn5n3rbfsDLC2TyQ1pVnRRmi','2017-05-29 13:27:01'),(26,795,'GMHRcc57gRGM6FEbnhiHXUbLfMlJCKHefgeMl','2017-05-29 13:29:42'),(27,796,'YkyafSOtjMe9d0dFYEB5eoh8l5Wt2MFQaI7sf','2017-05-29 13:30:34'),(28,797,'apIyeqtMa26riKvC8bmdV6nOr6Q6cTHDHbDI5','2017-05-29 13:32:15'),(37,792,'GsSx1dpV6kSJ7TskftM58YELkO4IG9XAunuBi','2017-06-01 11:37:46');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=804 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'bot','bot',NULL),(792,'plutonii','12345','roman1.kreidich@yandex.ru'),(793,'11111','11111','1111111@ttt.ttt'),(794,'22222','22222','33333@dd.uu'),(795,'33333','33333','3333@ff.ff'),(796,'232323','232323','232323@wd.df'),(797,'rrrrrrr','rrrrrrr','gfhj@gdrhd.fe'),(798,'aaaaa','aaaaa','rdgrd@rgfdgd.tdhg'),(799,'7777777','7777777','gyfjgj@rgdg.jyf'),(800,'ffFff','fd','dfd'),(801,'fffefef','fd','f'),(802,'ffffefefefef','fd','fe'),(803,'88888','88888','riomarewrer@resfes.fe');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `workspace`.`user_AFTER_INSERT` AFTER INSERT ON `user` FOR EACH ROW
BEGIN
	INSERT INTO user_profile (user_id) values (NEW.id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_profile` (
  `user_id` int(11) NOT NULL,
  `last_activity` datetime DEFAULT NULL,
  `number_of_tasks` int(11) NOT NULL DEFAULT '0',
  `number_of_completed_tasks` int(11) NOT NULL DEFAULT '0',
  `number_of_projects` int(11) NOT NULL DEFAULT '0',
  `path_of_avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_user_profile_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (3,NULL,10,9,9,NULL),(792,NULL,10,6,4,NULL),(793,NULL,1,0,2,NULL),(794,NULL,1,0,1,NULL),(795,NULL,1,0,1,NULL),(796,NULL,1,0,1,NULL),(797,NULL,1,0,1,NULL),(798,NULL,4,1,2,NULL),(799,NULL,3,0,1,NULL),(800,NULL,0,0,2,NULL),(801,NULL,0,0,1,NULL),(802,NULL,0,0,2,NULL),(803,NULL,1,0,1,NULL);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-01 13:07:07
