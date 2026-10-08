# Student Management REST API

## Web Dev III - Node.js & Express Backend
### Unit-2 Lab Assignment

This project implements the Student Management REST API described in the assignment.

## Requirements covered

- Express.js server
- Student CRUD operations
- Custom logger middleware
- Modular routing
- Error handling and HTTP status codes
- Array/JSON data only
- No MongoDB, MySQL or Mongoose
- Postman testing ready

## Project structure

```text
student-management-rest-api/
├── app.js
├── package.json
├── README.md
├── .gitignore
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
└── data/
    └── students.js
```

## Setup

Open the project folder in VS Code terminal and run:

```bash
npm install
```

Then start the server:

```bash
npm start
```

Server:

```text
http://localhost:3000
```

For development with Node watch mode:

```bash
npm run dev
```

## API endpoints

### 1. Get all students

```http
GET /students
```

### 2. Get student by ID

```http
GET /students/1
```

### 3. Create a student

```http
POST /students
Content-Type: application/json
```

Body:

```json
{
  "name": "Neha",
  "course": "BCA",
  "age": 20
}
```

Expected status: `201 Created`

### 4. Update a student

```http
PUT /students/1
Content-Type: application/json
```

Body:

```json
{
  "name": "Rahul Sharma",
  "course": "BCA",
  "age": 21
}
```

Expected status: `200 OK`

### 5. Delete a student

```http
DELETE /students/1
```

Expected status: `200 OK`

## Status codes

- `200` - Success
- `201` - Student created
- `400` - Invalid request/input
- `404` - Student/route not found
- `500` - Internal server error

## Postman testing

Create requests for all five endpoints:

1. GET `http://localhost:3000/students`
2. GET `http://localhost:3000/students/1`
3. POST `http://localhost:3000/students`
4. PUT `http://localhost:3000/students/1`
5. DELETE `http://localhost:3000/students/1`

For POST and PUT, select:

`Body -> raw -> JSON`

The data is stored in memory in `data/students.js`, as required by the assignment. Restarting the server resets the data to the initial records.
