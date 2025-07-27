
/**
 * Get a time window from the current time.
 * @param {number} minutes - The number of minutes for the time window.
 * @returns {object} - An object containing startTime and endTime.
 */
export function getTimeWindow(minutes) {
  const now = new Date();
  const startTime = new Date(now.getTime() - (minutes * 60 * 1000));
  return { startTime, endTime: now };
}

/**
 * Format a date into a readable string.
 * @param {Date|string} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date) {
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Paris'
  });
}

/**
 * Format a date for MongoDB (ISO string).
 * @param {Date|string} date - The date to format.
 * @returns {string} - The ISO formatted date string.
 */
export function formatDateForMongo(date) {
  return new Date(date).toISOString();
}
