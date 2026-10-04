/**
 * Main Application Server
 * Lab Assignment 2 - Student Management REST API
 * Student: Vedansh (Roll No: 2501730211)
 * Branch: B.Tech CSE AI-ML (Section F)
 * Course: Web Dev III (Node.js & Express Backend) Unit-2
 * 
 * Architecture:
 *   - Express.js HTTP Server
 *   - Custom Logger Middleware (Method, URL, Timestamp)
 *   - Modular Routing via /routes/studentRoutes
 *   - In-memory array data store via /data/students
 *   - Centralized 404 & Global Error Handling
 */

const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in Middleware for JSON payload parsing
app.use(express.json());

// Built-in Middleware for URL-encoded form data (optional convenience)
app.use(express.urlencoded({ extended: true }));

// Custom Logger Middleware
app.use(logger);

// Root Route: API Information & Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    project: 'Student Management REST API',
    assignment: 'Lab Assignment 2 (Unit-2)',
    author: {
      name: 'Vedansh',
      rollNo: '2501730211',
      branch: 'B.Tech CSE (AI & ML)',
      section: 'Section F'
    },
    endpoints: {
      'GET /students': 'Retrieve all students',
      'GET /students/:id': 'Retrieve student by ID',
      'POST /students': 'Create new student (Body: { name, course })',
      'PUT /students/:id': 'Update existing student (Body: { name?, course? })',
      'DELETE /students/:id': 'Delete student by ID'
    }
  });
});

// Mount Modular Student Routes
app.use('/students', studentRoutes);

// 404 Not Found Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}. Route not found.`
  });
});

// Centralized Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack || err.message);

  // Handle invalid JSON body syntax errors gracefully
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Malformed JSON payload in request body.'
    });
  }

  res.status(500).json({
    success: false,
    error: '500 Internal Server Error - An unexpected error occurred.'
  });
});

// Start Server if invoked directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Student Management REST API Server is running!`);
    console.log(`👨‍🎓 Student: Vedansh | Roll No: 2501730211 | Sec F`);
    console.log(`🌐 Local URL: http://localhost:${PORT}`);
    console.log(`📋 API Docs:  http://localhost:${PORT}/students`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;
