create database universitymanagementsystem;
use universitymanagementsystem;
create table login(username varchar(25), password varchar(25));
insert into login
values('admin', '12345');
CREATE TABLE student (

    rollno VARCHAR(20) PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    fname VARCHAR(100),

    dob DATE,

    address VARCHAR(255),

    phone VARCHAR(20),

    email VARCHAR(100),

    classX VARCHAR(20),

    classXII VARCHAR(20),

    aadhar VARCHAR(20),

    course VARCHAR(100),

    branch VARCHAR(100)
);
CREATE TABLE teacher (

    empId VARCHAR(20) PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    fname VARCHAR(100),

    dob DATE,

    address VARCHAR(255),

    phone VARCHAR(20),

    email VARCHAR(100),

    classX VARCHAR(20),

    classXII VARCHAR(20),

    aadhar VARCHAR(20),

    education VARCHAR(100),

    department VARCHAR(100)
);


CREATE TABLE studentleave (

    id INT AUTO_INCREMENT PRIMARY KEY,

    rollno VARCHAR(20),

    name VARCHAR(100),

    course VARCHAR(100),

    branch VARCHAR(100),

    leaveType VARCHAR(50),

    fromDate DATE,

    toDate DATE,

    reason TEXT,

    status VARCHAR(20) DEFAULT 'Pending',

    FOREIGN KEY (rollno)
        REFERENCES student(rollno)
        ON DELETE CASCADE
);

CREATE TABLE teacherleave (

    id INT AUTO_INCREMENT PRIMARY KEY,

    empId VARCHAR(20),

    name VARCHAR(100),

    department VARCHAR(100),

    leaveType VARCHAR(50),

    fromDate DATE,

    toDate DATE,

    reason TEXT,

    status VARCHAR(20) DEFAULT 'Pending',

    FOREIGN KEY(empId)
        REFERENCES teacher(empId)
        ON DELETE CASCADE
);
create table subject(
    rollno varchar(20),
    semester varchar(20),
    subject1 varchar(50),
    subject2 varchar(50),
    subject3 varchar(50),
    subject4 varchar(50),
    subject5 varchar(50)
);
CREATE TABLE marks (

    id INT AUTO_INCREMENT PRIMARY KEY,

    rollno VARCHAR(20),

    semester VARCHAR(20),

    subject1 VARCHAR(100),

    marks1 INT,

    subject2 VARCHAR(100),

    marks2 INT,

    subject3 VARCHAR(100),

    marks3 INT,

    subject4 VARCHAR(100),

    marks4 INT,

    subject5 VARCHAR(100),

    marks5 INT,

    FOREIGN KEY(rollno)
        REFERENCES student(rollno)
        ON DELETE CASCADE
);

INSERT INTO collegefee(course,semester,fee)
VALUES
('B.Tech','Semester 1',50000),
('B.Tech','Semester 2',50000),
('B.Tech','Semester 3',52000),
('B.Tech','Semester 4',52000),
('BCA','Semester 1',35000),
('BCA','Semester 2',35000);


CREATE TABLE collegefee (

    id INT AUTO_INCREMENT PRIMARY KEY,

    course VARCHAR(100),

    semester VARCHAR(20),

    fee DECIMAL(10,2)
);

CREATE TABLE fee (

    paymentId INT AUTO_INCREMENT PRIMARY KEY,

    rollno VARCHAR(20),

    studentName VARCHAR(100),

    course VARCHAR(100),

    semester VARCHAR(20),

    amount DECIMAL(10,2),

    paymentDate DATE,

    paymentMode VARCHAR(30),

    status VARCHAR(20),

    FOREIGN KEY(rollno)
        REFERENCES student(rollno)
        ON DELETE CASCADE
);