-- MySQL dump 10.13  Distrib 5.7.40, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: daphne
-- ------------------------------------------------------
-- Server version	5.7.40-0ubuntu0.18.04.1

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login_name` varchar(45) NOT NULL,
  `user_pwd` varchar(45) NOT NULL,
  `user_token` varchar(100) NOT NULL,
  `working_group_id` int(10) unsigned NOT NULL,
  `user_role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login_name_UNIQUE` (`login_name`),
  UNIQUE KEY `user_token_UNIQUE` (`user_token`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `user_role_id` (`user_role_id`),
  KEY `working_group_id` (`working_group_id`),
  CONSTRAINT `users_ibfk_5` FOREIGN KEY (`user_role_id`) REFERENCES `roles_list` (`role_id`),
  CONSTRAINT `users_ibfk_6` FOREIGN KEY (`working_group_id`) REFERENCES `group_list` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (47,'admin','admin','N2IyMjc1NzM2NTcyNWY2ZTYxNmQ2NTIyM2EyMjYxNjQ2ZDY5NmUyMjJjMjI3NTczNjU3MjVmNzA3NzY0MjIzYTIyNjE2NDZkNjk2',2,1),(49,'thomas','admin','N2IyMjc1NzM2NTcyNWY2ZTYxNmQ2NTIyM2EyMjc0Njg2ZjZkNjE3MzIyMmMyMjc1NzM2NTcyNWY3MDc3NjQyMjNhMjI2MTY0NmQ2',2,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-22  8:25:22
