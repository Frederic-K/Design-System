
/**
 * Validate a log level.
 * @param {string} level - The log level to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export function isValidLogLevel(level) {
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  return validLevels.includes(level?.toLowerCase());
}

/**
 * Validate an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate if a string is a valid JSON.
 * @param {string} str - The string to validate.
 * @returns {boolean} - True if valid JSON, false otherwise.
 */
export function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
