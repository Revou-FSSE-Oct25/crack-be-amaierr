# LMS Backend API

Backend service for the Learning Management System (LMS) platform. This project provides REST API services for course management, authentication, enrollment, assignments, and learning activities.

## Preview

[LMS Backend Deployment Link](https://crack-be-amaierr.onrender.com)

---

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Role-based access control
* Protected API routes

### Course Management

* Create and manage courses
* Course curriculum management
* Course enrollment system
* Course progress tracking

### User Management

* Student and instructor roles
* User profile management
* Enrollment monitoring

### Assignment & Learning

* Assignment management
* Learning material management
* Course activity tracking

### Backend Architecture

* RESTful API architecture
* Modular service structure
* Database migration support
* Environment-based configuration
* Error handling and validation

---

## Tech Stack

### Backend

* **Framework:** NestJS
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Prisma ORM
* **Authentication:** JWT Authentication

### Development Tools

* Postman

---

## Project Structure

```bash
src/
├── auth/              # Authentication module
├── users/             # User management module
├── courses/           # Course module
├── enrollments/       # Enrollment module
├── assignments/       # Assignment module
├── prisma/            # Prisma configuration
├── common/            # Shared utilities
└── main.ts            # Application entry point
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/amaierr/LMS-be.git
cd LMS-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

---

## Database Setup

### Run Prisma Migration

```bash
npx prisma migrate dev
```

### Generate Prisma Client

```bash
npx prisma generate
```

---

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Register new user        |
| POST   | `/auth/login`    | User login               |
| GET    | `/auth/profile`  | Get current user profile |

### Course Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | `/courses`     | Get all courses   |
| GET    | `/courses/:id` | Get course detail |
| POST   | `/courses`     | Create new course |
| PATCH  | `/courses/:id` | Update course     |
| DELETE | `/courses/:id` | Delete course     |

### Enrollment Endpoints

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | `/enrollments`      | Enroll to course     |
| GET    | `/enrollments/user` | Get user enrollments |

---

## Scripts

| Command             | Description            |
| ------------------- | ---------------------- |
| `npm run start:dev` | Run development server |

---

## Environment Variables

| Variable       | Description                |
| -------------- | -------------------------- |
| `DATABASE_URL` | Database connection string |
| `JWT_SECRET`   | JWT secret key             |
| `PORT`         | Application port           |

---

## Example Request

### Login Request

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Response

```json
{
  "access_token": "your_jwt_token"
}
```

---

## Future Improvements

* Video streaming support
* Quiz and examination module
* Certificate generation
* Real-time notification system
* Discussion forum
* Analytics dashboard

---

## Repository

[LMS Frontend Repository](https://github.com/amaierr/LMS-fe)
