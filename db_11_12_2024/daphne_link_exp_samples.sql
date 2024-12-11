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
-- Table structure for table `link_exp_samples`
--

DROP TABLE IF EXISTS `link_exp_samples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `link_exp_samples` (
  `link_id` int unsigned NOT NULL AUTO_INCREMENT,
  `link_exp_id` int unsigned NOT NULL,
  `link_sample_id` int unsigned NOT NULL,
  `link_exp_name` varchar(100) DEFAULT NULL,
  `link_sample_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`link_id`),
  UNIQUE KEY `link_id_UNIQUE` (`link_id`,`link_exp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_exp_samples`
--

LOCK TABLES `link_exp_samples` WRITE;
/*!40000 ALTER TABLE `link_exp_samples` DISABLE KEYS */;
INSERT INTO `link_exp_samples` VALUES (7,46,30,'Test Experiment98444','ztuzoiopü'),(8,46,31,'Test Experiment98444','poiorrr'),(9,46,32,'Test Experiment98444','GaAs- Ph3- 120N'),(71,46,33,'Test Experiment98444','Cu2-H2O eggyolk 1234586'),(92,48,33,'XFEL SAXS ','Cu2-H2O eggyolk 1234586'),(99,49,32,'WAXS ESRF','GaAs- Ph3- 120N'),(265,48,35,'XFEL SAXS ','Hemoglobin, albumin'),(289,51,35,'Raza Exp','Hemoglobin, albumin'),(290,51,36,'Raza Exp','Raza Sample'),(291,60,34,'Amir Exp','Ion4-H2O- So4'),(303,61,109,'ozgul','Au-200'),(304,61,110,'ozgul','Pb-100'),(305,61,113,'ozgul','TZU'),(308,62,120,'New Exp','New sample00'),(309,2,1,'p10Protein','mRNA');
/*!40000 ALTER TABLE `link_exp_samples` ENABLE KEYS */;
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

-- Dump completed on 2024-12-11 18:06:01
