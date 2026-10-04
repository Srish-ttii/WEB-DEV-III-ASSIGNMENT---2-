/**
 * Automated API Test Suite
 * Lab Assignment 2 - Student Management REST API
 * Student: Srishti (Roll No: 2501730380 | B.Tech CSE AI-ML Sec F)
 * 
 * Tests all requirements:
 *   - GET /students (200)
 *   - GET /students/:id (200)
 *   - GET /students/999 (404 Not Found)
 *   - POST /students (201 Created)
 *   - POST /students (400 Bad Request validation)
 *   - PUT /students/:id (200 OK)
 *   - PUT /students/999 (404 Not Found)
 *   - DELETE /students/:id (200 OK)
 *   - 404 Route handling
 */

const app = require('./app');

const PORT = 3099; // Test port to avoid conflicts
let server;

// ANSI Colors
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ${GREEN}✔ PASS:${RESET} ${testName}`);
    passed++;
  } else {
    console.error(`  ${RED}✖ FAIL:${RESET} ${testName}`);
    failed++;
  }
}

async function runTests() {
  const baseUrl = `http://localhost:${PORT}`;

  console.log(`\n${CYAN}=====================================================${RESET}`);
  console.log(`${CYAN}Starting Automated REST API Verification Suite${RESET}`);
  console.log(`Student: Srishti (2501730380) | B.Tech CSE AI-ML (Sec F)`);
  console.log(`${CYAN}=====================================================${RESET}\n`);

  try {
    // 1. Root Information Check
    console.log(`${CYAN}[Test 1] Health & Root Documentation${RESET}`);
    const rootRes = await fetch(`${baseUrl}/`);
    const rootData = await rootRes.json();
    assert(rootRes.status === 200, 'GET / returns 200 OK');
    assert(rootData.author.name === 'Srishti', 'Root endpoint contains author info');

    // 2. GET /students
    console.log(`\n${CYAN}[Test 2] GET /students (View All)${RESET}`);
    const getAllRes = await fetch(`${baseUrl}/students`);
    const getAllData = await getAllRes.json();
    assert(getAllRes.status === 200, 'GET /students returns 200 OK');
    assert(Array.isArray(getAllData.data), 'Returns an array of students');
    assert(getAllData.count >= 3, 'Initial dataset contains at least 3 students (Rahul, Priya, Amit)');

    // 3. GET /students/:id (Valid)
    console.log(`\n${CYAN}[Test 3] GET /students/:id (Valid ID)${RESET}`);
    const getOneRes = await fetch(`${baseUrl}/students/1`);
    const getOneData = await getOneRes.json();
    assert(getOneRes.status === 200, 'GET /students/1 returns 200 OK');
    assert(getOneData.data.name === 'Rahul', 'Returns correct student details (Rahul)');

    // 4. GET /students/:id (Not Found - 404)
    console.log(`\n${CYAN}[Test 4] GET /students/:id (404 Not Found)${RESET}`);
    const getNotFoundRes = await fetch(`${baseUrl}/students/9999`);
    const getNotFoundData = await getNotFoundRes.json();
    assert(getNotFoundRes.status === 404, 'GET /students/9999 returns 404 Not Found');
    assert(getNotFoundData.success === false, 'Returns success: false');

    // 5. GET /students/:id (Invalid ID format - 400)
    console.log(`\n${CYAN}[Test 5] GET /students/:id (400 Bad Request on invalid ID)${RESET}`);
    const getBadIdRes = await fetch(`${baseUrl}/students/abc`);
    assert(getBadIdRes.status === 400, 'GET /students/abc returns 400 Bad Request');

    // 6. POST /students (Valid creation - 201)
    console.log(`\n${CYAN}[Test 6] POST /students (Create Student - 201 Created)${RESET}`);
    const postRes = await fetch(`${baseUrl}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Sneha Sharma', course: 'MCA' })
    });
    const postData = await postRes.json();
    assert(postRes.status === 201, 'POST /students returns 201 Created');
    assert(postData.data.name === 'Sneha Sharma', 'Created student has correct name');
    assert(typeof postData.data.id === 'number', 'Student received an auto-generated numeric ID');
    const createdId = postData.data.id;

    // 7. POST /students (Validation error - 400 Bad Request)
    console.log(`\n${CYAN}[Test 7] POST /students (Validation 400 Bad Request)${RESET}`);
    const postInvalidRes = await fetch(`${baseUrl}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }) // missing course and empty name
    });
    assert(postInvalidRes.status === 400, 'POST with missing/empty fields returns 400 Bad Request');

    // 8. PUT /students/:id (Update - 200 OK)
    console.log(`\n${CYAN}[Test 8] PUT /students/:id (Update Student - 200 OK)${RESET}`);
    const putRes = await fetch(`${baseUrl}/students/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course: 'M.Tech AI' })
    });
    const putData = await putRes.json();
    assert(putRes.status === 200, 'PUT /students/:id returns 200 OK');
    assert(putData.data.course === 'M.Tech AI', 'Student course updated correctly');
    assert(putData.data.name === 'Sneha Sharma', 'Student name preserved');

    // 9. PUT /students/:id (404 Not Found)
    console.log(`\n${CYAN}[Test 9] PUT /students/9999 (404 Not Found)${RESET}`);
    const putNotFoundRes = await fetch(`${baseUrl}/students/9999`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course: 'BBA' })
    });
    assert(putNotFoundRes.status === 404, 'PUT /students/9999 returns 404 Not Found');

    // 10. DELETE /students/:id (200 OK)
    console.log(`\n${CYAN}[Test 10] DELETE /students/:id (Delete Student - 200 OK)${RESET}`);
    const deleteRes = await fetch(`${baseUrl}/students/${createdId}`, {
      method: 'DELETE'
    });
    const deleteData = await deleteRes.json();
    assert(deleteRes.status === 200, 'DELETE /students/:id returns 200 OK');
    assert(deleteData.data.id === createdId, 'Deleted student matches ID');

    // Verify student is actually deleted
    const verifyDeleteRes = await fetch(`${baseUrl}/students/${createdId}`);
    assert(verifyDeleteRes.status === 404, 'Subsequent GET on deleted student returns 404 Not Found');

    // 11. DELETE /students/:id (404 Not Found)
    console.log(`\n${CYAN}[Test 11] DELETE /students/9999 (404 Not Found)${RESET}`);
    const deleteNotFoundRes = await fetch(`${baseUrl}/students/9999`, {
      method: 'DELETE'
    });
    assert(deleteNotFoundRes.status === 404, 'DELETE non-existent returns 404 Not Found');

    // 12. 404 Unknown Route
    console.log(`\n${CYAN}[Test 12] Undefined Route 404 Handler${RESET}`);
    const unknownRouteRes = await fetch(`${baseUrl}/non-existent-endpoint`);
    assert(unknownRouteRes.status === 404, 'GET /non-existent-endpoint returns 404 Not Found');

    console.log(`\n${CYAN}=====================================================${RESET}`);
    console.log(`Results: ${GREEN}${passed} Passed${RESET}, ${failed > 0 ? RED : GREEN}${failed} Failed${RESET}`);
    console.log(`${CYAN}=====================================================${RESET}\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
}

server = app.listen(PORT, async () => {
  await runTests();
});
