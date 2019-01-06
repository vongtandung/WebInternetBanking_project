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
  `email` varchar(45) NOT NULL,
  `otpnum` varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OTP`
--

LOCK TABLES `OTP` WRITE;
/*!40000 ALTER TABLE `OTP` DISABLE KEYS */;
INSERT INTO `OTP` VALUES ('vongtandung@gmail.com','182326','2018-12-29 17:22:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'a','4QrcOUm6Wau+VuBX8g+IPg==','0123456718','Nguyễn Thị Hà','hanguyen@gmail.com',1),(2,'b','4QrcOUm6Wau+VuBX8g+IPg==','0124356182','Tần Dũng','vongtandung@gmail.com',0),(3,'c','4QrcOUm6Wau+VuBX8g+IPg==','0378726312','Nguyễn lê Hồng Ngọc','ngochaha@gmail.com',0),(5,'asd','4QrcOUm6Wau+VuBX8g+IPg==','0129312312','Lê Duy','asd@gmail.com',0);
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
INSERT INTO `paymentAccount` VALUES ('2018121512273183',2,50000),('20181215122731836',3,98102000),('2018121512273184',2,454000),('20190106211406812',2,50000);
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
  `fullName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userId`,`accountNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reciverList`
--

LOCK TABLES `reciverList` WRITE;
/*!40000 ALTER TABLE `reciverList` DISABLE KEYS */;
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
  `account` varchar(45) NOT NULL,
  `status` longtext NOT NULL,
  `amount` varchar(45) NOT NULL,
  `note` text,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`transId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionHistory`
--

LOCK TABLES `transactionHistory` WRITE;
/*!40000 ALTER TABLE `transactionHistory` DISABLE KEYS */;
INSERT INTO `transactionHistory` VALUES ('181215141002527','2018121512273184','Nhận 750000 từ Nguyễn Lê Hồng Ngọc','+750000','hello','2018/01/15 14:10:02:527'),('181225133307662','20181215122731832','Chuyển 5000 cho Nguyễn Lê Hồng Ngọc','-5000','hello','2018/12/25 13:33:07:662'),('181229231519678','2018121512273184','Chuyển 5000 đến Lê Hồng Ngọc','-5000','hello','2018/12/29 23:15:19:678'),('181229231519679','20181215104817205','Nhận 5000 từ Tần Dũng','+5000','hello','2018/12/29 23:15:19:679'),('190106170925431','2018121512273184','Chuyển 152000 đến ','-152000','undefined','2019/01/06 17:09:25:431'),('190106170925432','2018121512273184','Nhận 152000 từ Tài Khoản Bị Xóa','+152000','undefined','2019/01/06 17:09:25:432');
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
INSERT INTO `userRefreshTokenExt` VALUES (1,'k9TOnCFuR5e3gikWGhtPzfyro553ZbzgGBdlK6pFprZFoSdnLttLjT8iw2e7Vtcw703xRrkseyq8eFTI','2019-01-06 19:56:57'),(2,'TDmvc8qHoXngfPKjHLBhnbWpX5BckSxQ6c3yEZXOKCLacgRa7Q59JNgURwLDExHYZTqb2xX2UOhVAGlb','2019-01-06 19:28:15');
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

-- Dump completed on 2019-01-06 21:16:05
