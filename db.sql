-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: banking
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

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
-- Table structure for table `OTP`
--

DROP TABLE IF EXISTS `OTP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OTP` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `otpnum` varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OTP`
--

LOCK TABLES `OTP` WRITE;
/*!40000 ALTER TABLE `OTP` DISABLE KEYS */;
INSERT INTO `OTP` VALUES (1,'vongtandung@gmail.com','414674','2018-12-25 12:48:32'),(2,'vongtandung@gmail.com','314604','2018-12-25 12:49:52'),(3,'vongtandung@gmail.com','811473','2018-12-25 13:04:47'),(4,'vongtandung@gmail.com','627963','2018-12-25 14:11:06');
/*!40000 ALTER TABLE `OTP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `passWord` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `name` tinytext NOT NULL,
  `email` varchar(45) NOT NULL,
  `permission` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'a','4QrcOUm6Wau+VuBX8g+IPg==','0123456718','Nguyễn Thị Hà','hanguyen@gmail.com',1),(2,'b','4QrcOUm6Wau+VuBX8g+IPg==','0124356182','Trần Văn Ánh','anhtran2@gmail.com',0),(3,'c','4QrcOUm6Wau+VuBX8g+IPg==','0378726312','Nguyễn lê Hồng Ngọc','ngochaha@gmail.com',0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentAccount`
--

DROP TABLE IF EXISTS `paymentAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentAccount` (
  `accountNumber` varchar(45) NOT NULL,
  `userId` int(11) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`accountNumber`),
  UNIQUE KEY `accountNumber_UNIQUE` (`accountNumber`),
  KEY `fk_paymentAccount_1_idx` (`userId`),
  CONSTRAINT `fk_paymentAccount_1` FOREIGN KEY (`userId`) REFERENCES `account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentAccount`
--

LOCK TABLES `paymentAccount` WRITE;
/*!40000 ALTER TABLE `paymentAccount` DISABLE KEYS */;
INSERT INTO `paymentAccount` VALUES ('20181215104817205',2,70000000765000),('20181215122731836',3,9465000);
/*!40000 ALTER TABLE `paymentAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reciverList`
--

DROP TABLE IF EXISTS `reciverList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reciverList` (
  `userId` int(11) NOT NULL,
  `accountNumber` varchar(45) NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`userId`,`accountNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reciverList`
--

LOCK TABLES `reciverList` WRITE;
/*!40000 ALTER TABLE `reciverList` DISABLE KEYS */;
INSERT INTO `reciverList` VALUES (3,'20181215104817205','ngosgoc2');
/*!40000 ALTER TABLE `reciverList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactionHistory`
--

DROP TABLE IF EXISTS `transactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactionHistory` (
  `transId` varchar(45) NOT NULL,
  `sendAccount` varchar(45) DEFAULT NULL,
  `reciveAccount` varchar(45) DEFAULT NULL,
  `amount` varchar(45) NOT NULL,
  `note` text,
  `time` varchar(45) NOT NULL,
  `transType` text NOT NULL,
  PRIMARY KEY (`transId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionHistory`
--

LOCK TABLES `transactionHistory` WRITE;
/*!40000 ALTER TABLE `transactionHistory` DISABLE KEYS */;
INSERT INTO `transactionHistory` VALUES ('181215141002527','20181215104817205','20181215122731836','750000','hello','2018/12/15 14:10:02:527','Trans'),('181215142311727','20181215122731836','20181215104817205','750000','hello','2018/12/15 14:23:11:727','Trans'),('181225133307662','20181215122731836','20181215104817205','5000','hello','2018/12/25 13:33:07:662','Trans'),('181225133323925','20181215122731836','20181215104817205','5000','hello','2018/12/25 13:33:23:925','Trans'),('181225133600499','20181215122731836','20181215104817205','5000','hello','2018/12/25 13:36:00:499','Trans'),('181225133927289','20181215122731836','20181215104817205','5000','hello','2018/12/25 13:39:27:289','Trans'),('181225141137981','20181215122731836','20181215104817205','5000','hello','2018/12/25 14:11:37:981','Trans');
/*!40000 ALTER TABLE `transactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userRefreshTokenExt`
--

DROP TABLE IF EXISTS `userRefreshTokenExt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userRefreshTokenExt` (
  `UserId` int(11) NOT NULL,
  `RefreshToken` varchar(100) DEFAULT NULL,
  `rdt` datetime DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userRefreshTokenExt`
--

LOCK TABLES `userRefreshTokenExt` WRITE;
/*!40000 ALTER TABLE `userRefreshTokenExt` DISABLE KEYS */;
INSERT INTO `userRefreshTokenExt` VALUES (1,'DHyyzsgyrnlDNc8lECl4xy6X7i3duikm3laPivCpuZ1b8HiQYTciJGhCRjUT4pr5SO13KNuo9TtDgZCr','2018-12-14 16:32:38'),(2,'hqp6tjGCd5S3bv9NZpiz3niesTuK83XgLCOQjSe6nJmK1UkpUzZmjJ8kxi6z1Z1weVjABTIjXEprbSSi','2018-12-25 17:32:34');
/*!40000 ALTER TABLE `userRefreshTokenExt` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-25 21:02:54
