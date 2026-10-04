/**
 * Student Routes (Modular Routing via Express Router)
 * Lab Assignment 2 - Student Management REST API
 * Student: Vedansh (Roll No: 2501730211 | B.Tech CSE AI-ML Sec F)
 * 
 * Endpoints:
 *   - GET    /students       -> View all students (200 OK)
 *   - GET    /students/:id   -> View student by ID (200 OK / 404 Not Found / 400 Bad Request)
 *   - POST   /students       -> Add new student (201 Created / 400 Bad Request)
 *   - PUT    /students/:id   -> Update student (200 OK / 404 Not Found / 400 Bad Request)
 *   - DELETE /students/:id   -> Delete student (200 OK / 404 Not Found / 400 Bad Request)
 */

const express = require('express');
const router = express.Router();
const students = require('../data/students');

/**
 * Helper to parse and validate student ID
 */
function parseStudentId(idParam) {
  const id = parseInt(idParam, 10);
  if (Number.isNaN(id) || id <= 0) {
    return null;
  }
  return id;
}

/**
 * 1. GET /students
 * Retrieves the complete list of students.
 */
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Students retrieved successfully',
    count: students.length,
    data: students
  });
});

/**
 * 2. GET /students/:id
 * Retrieves a single student by their unique ID.
 */
router.get('/:id', (req, res) => {
  const studentId = parseStudentId(req.params.id);

  if (!studentId) {
    return res.status(400).json({
      success: false,
      error: 'Invalid student ID. ID must be a positive integer.'
    });
  }

  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: `Student with ID ${studentId} not found.`
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Student found',
    data: student
  });
});

/**
 * 3. POST /students
 * Adds a new student record to the in-memory dataset.
 * Request Body: { "name": "...", "course": "..." }
 */
router.post('/', (req, res) => {
  const { name, course } = req.body;

  // Validation: Check missing fields
  if (!name || !course) {
    return res.status(400).json({
      success: false,
      error: 'Both "name" and "course" are required fields.'
    });
  }

  // Validation: Check types and empty trimmed strings
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: '"name" must be a non-empty string.'
    });
  }

  if (typeof course !== 'string' || course.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: '"course" must be a non-empty string.'
    });
  }

  // Generate unique ID (max ID + 1, or 1 if empty)
  const maxId = students.reduce((max, s) => (s.id > max ? s.id : max), 0);
  const newStudent = {
    id: maxId + 1,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);

  return res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent
  });
});

/**
 * 4. PUT /students/:id
 * Updates an existing student's information.
 * Request Body: { "name"?: "...", "course"?: "..." }
 */
router.put('/:id', (req, res) => {
  const studentId = parseStudentId(req.params.id);

  if (!studentId) {
    return res.status(400).json({
      success: false,
      error: 'Invalid student ID. ID must be a positive integer.'
    });
  }

  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Student with ID ${studentId} not found.`
    });
  }

  const { name, course } = req.body;

  if (!name && !course) {
    return res.status(400).json({
      success: false,
      error: 'At least one field ("name" or "course") must be provided for update.'
    });
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '"name" must be a non-empty string.'
      });
    }
    students[studentIndex].name = name.trim();
  }

  if (course !== undefined) {
    if (typeof course !== 'string' || course.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '"course" must be a non-empty string.'
      });
    }
    students[studentIndex].course = course.trim();
  }

  return res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: students[studentIndex]
  });
});

/**
 * 5. DELETE /students/:id
 * Removes a student record by ID.
 */
router.delete('/:id', (req, res) => {
  const studentId = parseStudentId(req.params.id);

  if (!studentId) {
    return res.status(400).json({
      success: false,
      error: 'Invalid student ID. ID must be a positive integer.'
    });
  }

  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Student with ID ${studentId} not found.`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  return res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent
  });
});

module.exports = router;
