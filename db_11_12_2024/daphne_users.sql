-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: daphnerestored.c9zdqm1tdnav.eu-central-1.rds.amazonaws.com    Database: daphne
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `login_name` varchar(45) NOT NULL,
  `user_pwd` varchar(45) NOT NULL,
  `user_token` varchar(100) NOT NULL,
  `working_group_id` int unsigned NOT NULL,
  `user_role_id` int unsigned NOT NULL,
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
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 18:05:58
