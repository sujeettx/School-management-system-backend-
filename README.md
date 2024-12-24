# School Management System

A robust backend application for managing school data, built with Node.js, Express.js, and MongoDB. Features JWT authentication and CRUD operations for students, teachers, and classes.

## Features

- User Roles: Admin and regular users (students/teachers)
- JWT Authentication with role-based access
- CRUD Operations for teachers, students, and classes
- Database Relationships: Classes linked to Teachers, Students associated with Classes
- Input Validation through schema-defined fields

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/your-repository-url/school-management-system.git
cd school-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/schoolDB
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm start
```

## API Documentation

### Authentication

#### Register Admin
```
POST /admin/register
Content-Type: application/json

Request Body:
{
    "email": "admin@example.com",
    "password": "securePassword123"
}
```

#### Login
```
POST /admin/login
Content-Type: application/json

Request Body:
{
    "email": "admin@example.com",
    "password": "securePassword123"
}

Response:
{
    "token": "jwt_token_here"
}
```

### Students API

#### Create Student
```
POST /students
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
{
    "name": "Ananya Sharma",      // Required: Student's full name
    "email": "ananya.sharma@example.com",  // Required: Unique email
    "classId": "60d7f4c4f1f5b2c6d4a0f1e5", // Required: Valid class ID
    "profileImageUrl": "https://example.com/images/ananya-profile.jpg" // Optional
}
```

#### Get All Students
```
GET /students
Authorization: Bearer <token>
```

#### Get Student by ID
```
GET /students/:id
Authorization: Bearer <token>
```

#### Update Student
```
PUT /students/:id
Content-Type: application/json
Authorization: Bearer <token>

Request Body: 
// Include any fields you want to update from the create student schema
```

#### Delete Student
```
DELETE /students/:id
Authorization: Bearer <token>
```

### Teachers API

#### Create Teacher
```
POST /teachers
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
{
    "name": "Ravi Kumar",         // Required: Teacher's full name
    "email": "ravi.kumar@example.com",     // Required: Unique email
    "subject": "Full Stack Web Development", // Required: Teaching subject
    "profileImageUrl": "https://example.com/images/ravi-profile.jpg" // Optional
}
```

#### Get All Teachers
```
GET /teachers
Authorization: Bearer <token>
```

#### Get Teacher by ID
```
GET /teachers/:id
Authorization: Bearer <token>
```

#### Update Teacher
```
PUT /teachers/:id
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
// Include any fields you want to update from the create teacher schema
```

#### Delete Teacher
```
DELETE /teachers/:id
Authorization: Bearer <token>
```

### Classes API

#### Create Class
```
POST /classes
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
{
    "name": "Full Stack Web Development", // Required: Class name
    "teacherId": "60d7f4c4f1f5b2c6d4a0f1e5" // Required: Valid teacher ID
}
```

#### Get All Classes
```
GET /classes
Authorization: Bearer <token>
```

#### Get Class by ID
```
GET /classes/:id
Authorization: Bearer <token>
```

#### Update Class
```
PUT /classes/:id
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
// Include any fields you want to update from the create class schema
```

#### Delete Class
```
DELETE /classes/:id
Authorization: Bearer <token>
```

## Response Formats

### Success Response
```json
{
    "success": true,
    "data": {
        // Requested resource data
    },
    "message": "Operation successful"
}
```

### Error Response
```json
{
    "success": false,
    "error": {
        "code": "ERROR_CODE",
        "message": "Error description"
    }
}
```

## Authentication

- All API endpoints (except login and register) require JWT authentication
- Include the JWT token in the Authorization header:
  `Authorization: Bearer <your_token_here>`

## Dependencies

- express: ^4.17.1
- mongoose: ^6.0.0
- jsonwebtoken: ^8.5.1
- bcryptjs: ^2.4.3
- dotenv: ^10.0.0
- cors: ^2.8.5

## Future Enhancements

- Image upload integration
- Frontend development
- Pagination implementation
- Enhanced role management