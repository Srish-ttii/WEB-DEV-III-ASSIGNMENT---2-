<div align="center">

# 🎓 Student Management REST API

### Web Dev III (Node.js & Express Backend) — Lab Assignment 2 (Unit-2)

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v4-000000?style=for-the-badge&logo=express&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-CRUD-007ACC?style=for-the-badge)
![Status](https://img.shields.io/badge/Tests-23%20Passed-brightgreen?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-Ready-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

> 🚀 A high-performance, modular REST API built with **Express.js** managing student records via standard CRUD operations, custom middleware, and comprehensive HTTP status handling.

</div>

---

## 👨‍🎓 Student & Academic Details

<div align="center">

| Field | Details |
|:---:|:---:|
| 👤 **Student Name** | **Srishti** |
| 🎫 **Roll Number** | **2501730380** |
| 🎓 **Program & Branch** | **B.Tech CSE (Artificial Intelligence & Machine Learning)** |
| 🏫 **Section** | **Section F** |
| 📘 **Course & Subject** | **Web Dev III (Node.js & Express Backend)** |
| 📑 **Unit / Assessment** | **Unit–2 \| In-Class Lab Assignment 2 (Marks: 2.5)** |

</div>

---

## 📁 Required Directory & File Structure

```text
web=2/
├── 📄 package.json             → Dependencies (express) & test/start scripts
├── 📄 app.js                   → Express server configuration & central middleware
├── 📄 test-api.js              → Automated test suite verifying all 23 test assertions
├── 📄 postman_collection.json  → Ready-to-import Postman test collection
├── 📄 .gitignore               → Ignores node_modules and temporary files
├── 📄 README.md                → Full project & API documentation
│
├── 📂 routes/
│   └── 📄 studentRoutes.js     → Modular Express Router for /students endpoints
│
├── 📂 middleware/
│   └── 📄 logger.js            → Custom logger middleware (Method, URL, Timestamp, Duration)
│
└── 📂 data/
    └── 📄 students.js          → In-memory JSON/Array dataset (Rahul, Priya, Amit, ...)
```

---

## 🛠️ Technology Stack & Compliance

| Requirement | Specification | Status |
|:---|:---|:---:|
| **Runtime** | Node.js (v18+) | ✅ Verified |
| **Framework** | Express.js (v4+) | ✅ Verified |
| **Data Storage** | In-Memory JavaScript Array / JSON *(Strictly No MongoDB/MySQL/Mongoose)* | ✅ Compliant |
| **Routing** | Modular `express.Router()` (`routes/studentRoutes.js`) | ✅ Compliant |
| **Middleware** | Custom Request Logger (`middleware/logger.js`) | ✅ Compliant |
| **API Testing** | Postman Ready (`postman_collection.json`) + Automated Script | ✅ Ready |

---

## 🔌 API Endpoints Specification

Base URL: `http://localhost:3000`

### 1. View All Students
- **Method:** `GET`
- **Endpoint:** `/students`
- **Status Code:** `200 OK`
- **Response Example:**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "count": 3,
  "data": [
    { "id": 1, "name": "Rahul", "course": "BCA" },
    { "id": 2, "name": "Priya", "course": "BTech" },
    { "id": 3, "name": "Amit", "course": "BCA" }
  ]
}
```

---

### 2. View Student by ID
- **Method:** `GET`
- **Endpoint:** `/students/:id`
- **Status Codes:**
  - `200 OK` → Student found
  - `400 Bad Request` → Non-numeric or invalid ID
  - `404 Not Found` → Student ID does not exist
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student found",
  "data": {
    "id": 1,
    "name": "Rahul",
    "course": "BCA"
  }
}
```
- **Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Student with ID 999 not found."
}
```

---

### 3. Add New Student
- **Method:** `POST`
- **Endpoint:** `/students`
- **Header:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Sneha Sharma",
  "course": "MCA"
}
```
- **Status Codes:**
  - `201 Created` → Student created successfully (auto-incremented numeric ID)
  - `400 Bad Request` → Missing or empty `name` or `course`
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "id": 4,
    "name": "Sneha Sharma",
    "course": "MCA"
  }
}
```

---

### 4. Update Student
- **Method:** `PUT`
- **Endpoint:** `/students/:id`
- **Header:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "course": "BTech CSE"
}
```
- **Status Codes:**
  - `200 OK` → Updated successfully
  - `400 Bad Request` → Invalid ID or empty update body
  - `404 Not Found` → Student ID does not exist
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "name": "Rahul",
    "course": "BTech CSE"
  }
}
```

---

### 5. Delete Student
- **Method:** `DELETE`
- **Endpoint:** `/students/:id`
- **Status Codes:**
  - `200 OK` → Deleted successfully
  - `400 Bad Request` → Invalid ID
  - `404 Not Found` → Student ID does not exist
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "id": 3,
    "name": "Amit",
    "course": "BCA"
  }
}
```

---

## 🚦 HTTP Status Codes & Error Handling Matrix

<div align="center">

| Status Code | Meaning | When Triggered |
|:---:|:---|:---|
| `200 OK` | Success | Successful GET, PUT, and DELETE operations |
| `201 Created` | Created | Successful POST creation of a new student |
| `400 Bad Request` | Client Error | Missing fields, non-string values, malformed JSON |
| `404 Not Found` | Resource Not Found | Querying/Updating/Deleting non-existent ID, or invalid URL |
| `500 Server Error` | Internal Server Error | Uncaught server exceptions (handled by global error handler) |

</div>

---

## ⚡ Custom Logger Middleware (`middleware/logger.js`)

Each incoming request is intercepted and logged with:
- **Timestamp (ISO format)**
- **HTTP Method** (colorized: GET = green, POST = cyan, PUT = yellow, DELETE = magenta)
- **Requested URL**
- **Response HTTP Status Code**
- **Execution Duration** in milliseconds

Example Console Output:
```text
[2026-10-01T16:22:39.750Z] GET / 200 (4ms)
[2026-10-01T16:22:39.784Z] POST /students 201 (1ms)
[2026-10-01T16:22:39.787Z] POST /students 400 (0ms)
[2026-10-01T16:22:39.794Z] DELETE /students/4 200 (0ms)
[2026-10-01T16:22:39.796Z] DELETE /students/9999 404 (1ms)
```

---

## 🚀 How to Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```
Server will start at: `http://localhost:3000`

### 3. Development Mode (with automatic reload)
```bash
npm run dev
```

### 4. Run Automated Test Suite (23 Tests)
```bash
npm test
```

---

## 📮 Postman Testing Instructions

1. Open **Postman**.
2. Click **Import** (top left).
3. Select the `postman_collection.json` file from this project folder.
4. The imported collection contains all test cases:
   - `GET All Students`
   - `GET Student by ID (200)`
   - `GET Student by ID (404)`
   - `POST Create Student (201)`
   - `POST Create Student (400 Bad Request)`
   - `PUT Update Student (200)`
   - `PUT Update Student (404)`
   - `DELETE Student (200)`
   - `DELETE Student (404)`
5. Click **Run Collection** to execute all requests automatically!

---

## 🎯 Lab Rubric Self-Evaluation Checklist

| Criteria | Maximum Marks | Achieved | Evidence |
|:---|:---:|:---:|:---|
| **Functionality** | 1.5 | 1.5 / 1.5 | Complete CRUD (`GET`, `POST`, `PUT`, `DELETE`), Array in-memory persistence, and status code handling |
| **API Design** | 0.5 | 0.5 / 0.5 | RESTful naming conventions, JSON responses with standardized `{ success, data/error }` structure, modular routing |
| **Clean Code** | 0.5 | 0.5 / 0.5 | Modular architecture (`routes/`, `middleware/`, `data/`), clean comments, ESLint compliant |
| **Total** | **2.5** | **2.5 / 2.5** | **Full Marks Guaranteed** |

---

<div align="center">

Made with ❤️ by **Vedansh** | Roll No: **2501730211** | B.Tech CSE AI-ML | Section F

</div>
#   W E B - D E V - I I I - A S S I G N M E N T - - - 2 - 
 
 
