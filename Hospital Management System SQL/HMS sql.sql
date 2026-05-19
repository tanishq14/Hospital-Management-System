CREATE DATABASE doctor_db;
CREATE DATABASE patient_db;
CREATE DATABASE appointment_db;
CREATE DATABASE bed_management_db;

USE doctor_db;
CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    YOE INT NOT NULL,
    status ENUM('free', 'busy') DEFAULT 'free'
);

USE patient_db;
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    BloodPressure VARCHAR(50),
    BodyTemperature VARCHAR(50),
    HeartRate VARCHAR(50),
    Height VARCHAR(50),
    Weight VARCHAR(50),
    Medicines TEXT,
    Age INT,
    assigned_bed_id INT NULL
);

USE appointment_db;
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    doctor_name VARCHAR(255) NOT NULL
);

USE bed_management_db;
CREATE TABLE beds (
    bed_id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('available', 'occupied') DEFAULT 'available',
    patient_id INT NULL
);