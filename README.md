 Hospital Management System - Microservices Setup

Overview
This project is a Hospital Management System (HMS) built using Spring Boot, React, MySQL, and Eureka Server. It consists of multiple microservices for Doctors, Patients, Nurses, and Appointments. Each microservice has its own database and communicates using REST APIs.
![Screenshot 2025-03-16 225134](https://github.com/user-attachments/assets/aa58f4eb-a1d5-4da4-807d-6f219458187f)

Architecture
- Backend: Java (Spring Boot, JDBC, Eureka Server, RestTemplate)
- Frontend: React.js
- Database: MySQL (Each microservice has its own database)
- Service Discovery: Eureka Server

Microservices Structure
Doctor Microservice
- Manages doctor information, availability, and appointments.
- Runs on port `8081`.

Patient Microservice
- Handles patient registration, appointment booking, and medical records.
- Runs on port `8083`.

Appointment Microservice
- Manages appointment scheduling and status updates.
- Runs on port `8082`.

Nurse Microservice
- Allows nurses to update patient vitals and manage hospital beds.
- Runs on port `8084`.

Eureka Server (Service Discovery)
- Registers all microservices and enables inter-service communication.
- Runs on port `8761`.

Installation & Setup
 1. Clone the Repository
```sh
git clone https://github.com/yourusername/Hospital-Management-System.git
cd Hospital-Management-System
```

 2. Start MySQL Database
Ensure MySQL is running and create required databases:
```sql
CREATE DATABASE doctor_db;
CREATE DATABASE patients_db;
CREATE DATABASE appointments_db;
CREATE DATABASE bed_management_db;
```

 3. Configure `application.properties` for each Microservice
Example (`src/main/resources/application.properties`):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/doctor_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
server.port=8081
```
Repeat for Patient (8083), Appointment (8082), and Nurse (8084) microservices with their respective databases.

 4. Start Eureka Server
Navigate to the Eureka server directory:
```sh
cd hmsEurekaServer
mvn spring-boot:run
```

 5. Start Microservices
For each microservice, run:
```sh
cd HmsDoctorMicroservice   Or HmsPatientMicroservice, HmsAppointmentMicroservice, HmsNurseMicroservice
mvn spring-boot:run
```

 6. Install & Run React Frontend
Each frontend folder (`doctor-registration`, `patient`, `nurse`) contains a separate React application.

```sh
cd doctor-registration   Change to respective frontend folder
npm install          Install dependencies
npm start            Run the React frontend
```

Common Issues & Fixes
- MySQL Connection Refused: Ensure MySQL is running and credentials are correct.
- Port Conflict: Check if ports 8081, 8082, 8083, 8084, and 8761 are free.
- React Not Loading: Run `npm install` inside each frontend folder before `npm start`.

Conclusion
This project successfully implements a scalable, microservice-based Hospital Management System. It provides secure and efficient management for doctors, patients, nurses, and appointments using a Spring Boot backend, MySQL database, and React.js frontend.
