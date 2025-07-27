
/**
 * Get the color associated with a log level.
 * @param {string} level - The log level.
 * @returns {string} - The color code.
 */
export function getLogLevelColor(level) {
  const colors = {
    debug: '#6b7280',   // gray
    info: '#10b981',    // green
    warn: '#f59e0b',    // orange
    error: '#dc2626',   // red
    fatal: '#7c2d12'    // dark red
  };
  return colors[level?.toLowerCase()] || '#6b7280';
}

/**
 * Format a size in bytes.
 * @param {number} bytes - The size in bytes.
 * @returns {string} - The formatted size.
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format a duration in milliseconds.
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} - The formatted duration.
 */
export function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}

/**
 * Generate a simple unique ID.
 * @returns {string} - A unique ID.
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Sanitize and validate query parameters.
 * @param {object} query - The query parameters to sanitize and validate.
 * @returns {object} - The sanitized and validated query parameters.
 */
export function sanitizeQueryParams(query) {
  const sanitized = {};
  
  // Default limit
  if (query.limit) {
    const limit = parseInt(query.limit);
    sanitized.limit = Math.min(Math.max(limit, 1), 1000); // Between 1 and 1000
  } else {
    sanitized.limit = 100;
  }
  
  // Default offset
  if (query.offset) {
    const offset = parseInt(query.offset);
    sanitized.offset = Math.max(offset, 0); // Minimum 0
  } else {
    sanitized.offset = 0;
  }
  
  // Time window
  if (query.timeWindow) {
    const timeWindow = parseInt(query.timeWindow);
    sanitized.timeWindow = Math.min(Math.max(timeWindow, 1), 1440); // Between 1 minute and 24h
  }
  
  // Log level
  if (query.level && isValidLogLevel(query.level)) {
    sanitized.level = query.level.toLowerCase();
  }
  
  return sanitized;
}
