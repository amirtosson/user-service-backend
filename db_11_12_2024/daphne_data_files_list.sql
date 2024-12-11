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
-- Table structure for table `data_files_list`
--

DROP TABLE IF EXISTS `data_files_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_files_list` (
  `data_file_id` int unsigned NOT NULL AUTO_INCREMENT,
  `data_file_name` varchar(150) NOT NULL,
  `data_file_added_on` date DEFAULT NULL,
  `data_file_owner_id` int unsigned NOT NULL,
  `data_file_doi` varchar(200) DEFAULT NULL,
  `data_file_linked_dataset_instance_id` int unsigned DEFAULT NULL,
  `data_file_linked_experiment_id` int unsigned DEFAULT NULL,
  `data_file_pid` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`data_file_id`),
  UNIQUE KEY `data_file_id_UNIQUE` (`data_file_id`),
  UNIQUE KEY `data_file_name_UNIQUE` (`data_file_name`),
  UNIQUE KEY `data_file_pid_UNIQUE` (`data_file_pid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_files_list`
--

LOCK TABLES `data_files_list` WRITE;
/*!40000 ALTER TABLE `data_files_list` DISABLE KEYS */;
INSERT INTO `data_files_list` VALUES (1,'The first data','2024-03-06',47,'VTJGc2RHVmtYMStjamVpczJoUEtPZGtsVkMrZ054Qm1UYjNOSzdvOWJSTkMvdzR6b0dDUHZlM21POXVENjRFUzVmdkhLWXRDeERHSm00NjIxWVpCMWc9PQ',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/41467_2023_41202_MOESM4_ESM.xlsx'),(2,'The second data ozgul','2024-03-06',47,'VTJGc2RHVmtYMS9VRzcxVVlSRGx2YmsrRWhQU1JTRTkyNHJEWkFCMGN2VT0',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/run_114421.txt'),(4,'The fourth data Aliaksandr','2024-03-06',47,'VTJGc2RHVmtYMStqbzJSYk5FY1p3aGJ6bi9OeFRWaE9QRm9JSlNPWEhVblNuUkQveFRhRVhLSExEZDl5TEc3Kw',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/assembled_mean_image.npy'),(9,'Third file RAZA','2024-03-06',47,'VTJGc2RHVmtYMSt6ZElYb1dOenJUNWt0V05NWmo2SWFORFdzRWZ5dzNmMD0',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/qvals.npy'),(10,'5th data Amir','2024-03-07',47,'VTJGc2RHVmtYMStxVVNsQjFjbDNwcnZBcll2KzFrYUpjeUdzR2pRZjVoUT0',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/run_49136.txt'),(11,'6th data file Dmitriy Ksenzov','2024-03-07',47,'VTJGc2RHVmtYMStXZEVxRlFwNkFPdTg5RGNMaEpJUzZ1NFYxMXhoY2xCaFp1MHFiSUNJcnlRYWVHUU53aEpCaA',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/imageCL_FAB661_scan11.txt'),(12,'The 7th data ','2024-03-08',47,'VTJGc2RHVmtYMTlhQi96TG9uV245V2ZMNHdtQy9zVzVXajhUMkQ2RjFEZz0',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/run_49195.txt'),(13,'p10_first_data','2024-03-15',47,'VTJGc2RHVmtYMS82bzJKc2Ryb2lSKzdNT2lGR25aUUgvUWNVcnRDY2R5cGxiamdscDFwUTVwTjJ2Tlh4cnN1Ry9JY3lpdGFoNldaeHJKendnNWdxOEE9PQ',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/mask_usaxs_e4m_yolksalt_pyfai.npy'),(14,'mask','2024-06-04',47,'VTJGc2RHVmtYMS9ZaS9oWXRBck5oK2xlU2VEcmZSSlQ4cDlvMDliY01DVHVVVnc4cks0UklCazN6ZzJ2WTUvbw',28,2,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/original_images.npy'),(15,'maskTest','2024-06-04',47,'VTJGc2RHVmtYMThWelNZWC9TUXZsanVKbmk3RmZ3U2ZaN3FLS011NzgrY0RjZlAzQk5vMG1wbVlpZlMxcFN0bA',29,4,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/smeared_images.npy'),(16,'Faster chiral versus collinear magnetic','2024-06-20',47,'VTJGc2RHVmtYMSs3MHJqN0pDK2taWjVEM3RZNDN3WWtObU5JcUJLVFg2WUFiUWNNSXNwVXlTajdKYS84RlBQRw',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/XUV_scattering.h5'),(17,'m029_eggwhite_70C_bd','2024-06-20',47,'VTJGc2RHVmtYMTlLSzBDM1N2VVZ1cVRQOUpGdnJ6RWJHN3g2Ym4xMjBtOUt6a0M5SzdQeTc2aE1zWWRaVmw1MkFZbDdpeWZHTXlndHlLUnlMNTY4Kzh0eG9DN1VHZFY0M2syRHl6VDdLckE9',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/processed_compressed_m029_eggwhite_70C_bd_00001.h5'),(18,'starch_100mgml_1000mMNaCl','2024-06-20',47,'VTJGc2RHVmtYMTlDR2s4TDVKbGhlZ0pub2RFbUFPeEcyOHVSKzc1NW9zOXQ5Y05SazB0bVBHcDViU1gzeVFSQVJpVWlka2R0dXl5cW9ETzJuSmZ5WkFGL3ozbk9QRTJzQktoOWc2eDRzU3M9',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/m0025_starch_100mgml_1000mMNaCl_110C_abs16_00008_data_000001.h5'),(21,'nature communication data ','2024-06-20',47,'VTJGc2RHVmtYMStudzhBS1QxazVaajVHTG9GSXRubWhoZElZZHFMTnE1aWN3ckhQZ0tUMm1IR1gwZW9JcGprMQ',0,0,'https://data-storage-xpcs.s3.eu-central-1.amazonaws.com/data-files/41467_2023_41202_MOESM4_ESM.zip');
/*!40000 ALTER TABLE `data_files_list` ENABLE KEYS */;
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

-- Dump completed on 2024-12-11 18:06:00
