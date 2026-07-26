-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: universitymanagementsystem
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collegefee`
--

DROP TABLE IF EXISTS `collegefee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collegefee` (
  `rollno` varchar(20) DEFAULT NULL,
  `course` varchar(20) DEFAULT NULL,
  `branch` varchar(20) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `total` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collegefee`
--

LOCK TABLES `collegefee` WRITE;
/*!40000 ALTER TABLE `collegefee` DISABLE KEYS */;
/*!40000 ALTER TABLE `collegefee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee`
--

DROP TABLE IF EXISTS `fee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee` (
  `course` varchar(20) DEFAULT NULL,
  `semester1` varchar(20) DEFAULT NULL,
  `semester2` varchar(20) DEFAULT NULL,
  `semester3` varchar(20) DEFAULT NULL,
  `semester4` varchar(20) DEFAULT NULL,
  `semester5` varchar(20) DEFAULT NULL,
  `semester6` varchar(20) DEFAULT NULL,
  `semester7` varchar(20) DEFAULT NULL,
  `semester8` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee`
--

LOCK TABLES `fee` WRITE;
/*!40000 ALTER TABLE `fee` DISABLE KEYS */;
INSERT INTO `fee` VALUES ('BTech','48000','43000','43000','43000','43000','43000','43000','43000'),('Bsc','40000','35000','35000','35000','35000','35000','',''),('BCA','35000','34000','34000','34000','34000','34000','',''),('MTech','65000','60000','60000','60000','','','',''),('MSc','47500','45000','45000','45000','','','',''),('MCA','43000','42000','42000','49000','','','',''),('Bcom','22000','20000','20000','20000','20000','20000','',''),('Mcom','36000','30000','30000','30000','','','','');
/*!40000 ALTER TABLE `fee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('admin','12345');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks` (
  `rollno` varchar(20) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `marks1` int DEFAULT NULL,
  `marks2` int DEFAULT NULL,
  `marks3` int DEFAULT NULL,
  `marks4` int DEFAULT NULL,
  `marks5` int DEFAULT NULL,
  UNIQUE KEY `unique_student_semester_marks` (`rollno`,`semester`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
INSERT INTO `marks` VALUES ('IT101','4',75,87,76,98,87),('IT101','1',57,87,9,94,99);
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `name` varchar(40) DEFAULT NULL,
  `fname` varchar(40) DEFAULT NULL,
  `rollno` varchar(20) DEFAULT NULL,
  `dob` varchar(40) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `class_x` varchar(20) DEFAULT NULL,
  `class_xii` varchar(20) DEFAULT NULL,
  `aadhar` varchar(20) DEFAULT NULL,
  `course` varchar(40) DEFAULT NULL,
  `branch` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('Rahul Sharma','Rajesh Sharma','IT001','1945-07-18','Mumbai','9876453612','Rahuul@gmail.com','57','75','12346578904','BCA','Electronics'),('Ram','Hanuman','IT001','2026-07-25','Wadala','8987774638','Ram@gmail.com','85','80','127878898788','M.Tech','Civil');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentfee`
--

DROP TABLE IF EXISTS `studentfee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentfee` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `rollno` varchar(20) NOT NULL,
  `studentName` varchar(100) NOT NULL,
  `course` varchar(50) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentMode` varchar(30) NOT NULL,
  `paymentDate` date NOT NULL,
  `transactionId` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Paid',
  PRIMARY KEY (`paymentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentfee`
--

LOCK TABLES `studentfee` WRITE;
/*!40000 ALTER TABLE `studentfee` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentfee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentleave`
--

DROP TABLE IF EXISTS `studentleave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentleave` (
  `rollno` varchar(20) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `course` varchar(40) DEFAULT NULL,
  `branch` varchar(40) DEFAULT NULL,
  `leaveType` varchar(40) DEFAULT NULL,
  `fromDate` varchar(20) DEFAULT NULL,
  `toDate` varchar(20) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentleave`
--

LOCK TABLES `studentleave` WRITE;
/*!40000 ALTER TABLE `studentleave` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentleave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `rollno` varchar(20) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `subject1` varchar(50) DEFAULT NULL,
  `subject2` varchar(50) DEFAULT NULL,
  `subject3` varchar(50) DEFAULT NULL,
  `subject4` varchar(50) DEFAULT NULL,
  `subject5` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `name` varchar(40) DEFAULT NULL,
  `fname` varchar(40) DEFAULT NULL,
  `empId` varchar(20) DEFAULT NULL,
  `dob` varchar(40) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `class_x` varchar(20) DEFAULT NULL,
  `class_xii` varchar(20) DEFAULT NULL,
  `aadhar` varchar(20) DEFAULT NULL,
  `education` varchar(40) DEFAULT NULL,
  `department` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacherleave`
--

DROP TABLE IF EXISTS `teacherleave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacherleave` (
  `employeeId` varchar(20) NOT NULL,
  `teacherName` varchar(100) NOT NULL,
  `department` varchar(50) NOT NULL,
  `leaveType` varchar(50) NOT NULL,
  `fromDate` varchar(20) NOT NULL,
  `toDate` varchar(20) NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacherleave`
--

LOCK TABLES `teacherleave` WRITE;
/*!40000 ALTER TABLE `teacherleave` DISABLE KEYS */;
INSERT INTO `teacherleave` VALUES ('ABD055','Bhupedra Jogi','Civil','Personal Leave','2026-07-16','2026-07-17','Protest');
/*!40000 ALTER TABLE `teacherleave` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-26 19:23:04
