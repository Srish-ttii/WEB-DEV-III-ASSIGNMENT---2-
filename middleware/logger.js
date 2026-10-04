/**
 * Custom Logger Middleware
 * Lab Assignment 2 - Student Management REST API
 * Student: Srishti (Roll No: 2501730380 | B.Tech CSE AI-ML Sec F)
 * 
 * Requirement:
 *   - Logs HTTP Method, Requested URL, and Timestamp for incoming requests.
 */

// ANSI Color codes for clean terminal output
const COLORS = {
  RESET: '\x1b[0m',
  CYAN: '\x1b[36m',
  YELLOW: '\x1b[33m',
  GREEN: '\x1b[32m',
  MAGENTA: '\x1b[35m',
  GRAY: '\x1b[90m',
  BOLD: '\x1b[1m'
};

function getMethodColor(method) {
  switch (method) {
    case 'GET': return COLORS.GREEN;
    case 'POST': return COLORS.CYAN;
    case 'PUT': return COLORS.YELLOW;
    case 'DELETE': return COLORS.MAGENTA;
    default: return COLORS.RESET;
  }
}

/**
 * Custom Request Logger Middleware
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  const methodColor = getMethodColor(req.method);

  // Intercept response finish event to log status and duration
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode;
    const statusColor = status >= 400 ? '\x1b[31m' : status >= 300 ? COLORS.YELLOW : COLORS.GREEN;

    console.log(
      `${COLORS.GRAY}[${timestamp}]${COLORS.RESET} ` +
      `${methodColor}${COLORS.BOLD}${req.method}${COLORS.RESET} ` +
      `${req.originalUrl || req.url} ` +
      `${statusColor}${status}${COLORS.RESET} ` +
      `${COLORS.GRAY}(${duration}ms)${COLORS.RESET}`
    );
  });

  next();
}

module.exports = requestLogger;
