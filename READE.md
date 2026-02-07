# Event Management System  
## RESTful Service-Oriented Architecture (SOA) Project

---

## 1. Project Overview

This project is an **Event Management System** built using **RESTful Service-Oriented Architecture (SOA)**.  
The system is divided into multiple independent services that communicate using **REST APIs over HTTP**.

The application supports **User** and **Organizer** roles with **JWT-based authentication** and provides a complete workflow for event creation, booking, and management.

---

## 2. What is SOA?

**Service-Oriented Architecture (SOA)** is a software design approach where an application is broken into **independent services**, each responsible for a specific business function.

In this project:
- User management is handled by **User Service**
- Event management is handled by **Event Service**
- Ticket booking is handled by **Booking Service**

Each service runs independently and communicates via REST APIs.

---

## 3. What is REST?

**REST (Representational State Transfer)** is an architectural style that uses standard HTTP methods:

- `GET` – Retrieve data  
- `POST` – Create data  
- `PUT` – Update data  
- `DELETE` – Remove data  

All communication is done using **JSON format**.

---

## 4. Advantages of RESTful SOA

- Loose coupling between services
- Services are reusable
- Easy scalability and maintenance
- Multiple clients (web/mobile) can use the same APIs
- Industry-standard architecture

---

## 5. Stakeholders (Actors)

- **User**
  - View events
  - Book tickets
  - View and cancel bookings
  - View profile

- **Organizer**
  - Create events
  - Update or delete events
  - View created events
  - View profile

---

## 6. Key Features Implemented

### Authentication & Authorization
- User & Organizer registration
- Login with JWT authentication
- Role-based access control
- Protected routes using JWT middleware

### Event Management
- Create events (Organizer only)
- View all events
- Update or delete events (Organizer only)

### Booking Management
- Book event tickets (User only)
- Cancel booking
- View user bookings

### Profile Management
- Fetch user profile using JWT
- Display name, email, role
- Role-based UI rendering

### Frontend
- Login / Register page
- Events page
- Bookings page
- Profile page
- Role-based UI visibility

---

## 7. Technology Stack

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication
- JSON Web Token (JWT)
- bcryptjs for password hashing

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

### Tools
- Postman (API testing)
- MySQL Workbench
- VS Code
- Live Server (frontend)

---

## 8. Project Architecture

### Services & Ports

| Service          | Port |
|------------------|------|
| User Service     | 3001 |
| Event Service    | 3002 |
| Booking Service  | 3003 |

Each service has:
- Controller
- Model
- Routes
- Middleware
- Database configuration

---

## 9. Project Folder Structure

event-management/
│
├── user-service/
│ ├── controller.js
│ ├── routes.js
│ ├── model.js
│ ├── middleware.js
│ ├── config/db.js
│ ├── server.js
│ ├── .env
│ └── package.json
│
├── event-service/
│ ├── controller.js
│ ├── routes.js
│ ├── model.js
│ ├── middleware.js
│ ├── config/db.js
│ ├── server.js
│ ├── .env
│ └── package.json
│
├── booking-service/
│ ├── controller.js
│ ├── routes.js
│ ├── model.js
│ ├── middleware.js
│ ├── config/db.js
│ ├── server.js
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── index.html
│ ├── events.html
│ ├── bookings.html
│ ├── profile.html
│ ├── css/style.css
│ └── js/
│ ├── auth.js
│ ├── events.js
│ ├── bookings.js
│ ├── profile.js
│ └── utils.js
│
└── README.md



---

## 10. Database Setup

```sql
CREATE DATABASE event_management;
USE event_management;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('USER', 'ORGANIZER'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  event_date DATE,
  location VARCHAR(100),
  organizer_id INT,
  FOREIGN KEY (organizer_id) REFERENCES users(id)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_id INT,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('BOOKED', 'CANCELLED'),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);
11. Environment Variables (.env)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql
DB_NAME=event_management
JWT_SECRET=your_secure_random_secret_key

12. How to Run the Project
Step 1: Install dependencies

Run inside each service folder:

npm install

Step 2: Start backend services
node server.js


Run for:

user-service

event-service

booking-service

Step 3: Run frontend

Open frontend folder

Use Live Server

Open index.html

13. JWT Authentication Flow

User logs in

Server generates JWT

JWT stored in localStorage

Token sent in Authorization header

Middleware validates token

User identity extracted securely

14. Common Issues & Fixes

Create Event not visible → user role must be ORGANIZER

401 Unauthorized → token missing or expired

404 errors → incorrect API endpoint or service not running

MIME type error → wrong JS file path

15. Viva-Ready Explanation

Why SOA?
SOA improves scalability and separates responsibilities into independent services.

Why JWT?
JWT provides secure, stateless authentication.

How is role-based access handled?
Roles are stored in JWT and verified in middleware and frontend.

Why separate services?
Each service handles a single responsibility, following SOA principles.

16. Conclusion

This project demonstrates:

Practical implementation of RESTful SOA

Secure authentication using JWT

Role-based access control

Clean separation of services

Full backend–frontend integration

The system follows industry standards and is suitable for academic submission and viva examination.


---

### ✅ This README is:
- Professional
- Exam-safe
- Industry-style
- Easy to explain
- Matches your actual implementation

If you want next:
- **One-page viva cheat sheet**
- **Architecture diagram**
- **API documentation table**
- **Final submission checklist**

Just tell me 👊
