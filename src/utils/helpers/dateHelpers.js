/**
 * Get a time window from the current time.
 * @param {number} minutes - The number of minutes for the time window.
 * @returns {object} - An object containing startTime and endTime.
 */
export function getTimeWindow(minutes) {
  if (typeof minutes !== "number" || minutes < 0) {
    throw new Error("Minutes must be a positive number")
  }

  const now = new Date()
  const startTime = new Date(now.getTime() - minutes * 60 * 1000)
  return { startTime, endTime: now }
}

/**
 * Format a date into a readable string.
 * @param {Date|string|number} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date) {
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date")
    }

    return dateObj.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Paris",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

/**
 * Check if a date is valid.
 * @param {Date|string|number} date - The date to validate.
 * @returns {boolean} - True if the date is valid.
 */
export function isValidDate(date) {
  const dateObj = new Date(date)
  return !isNaN(dateObj.getTime())
}

/**
 * Get the difference between two dates in various units.
 * @param {Date|string} date1 - The first date.
 * @param {Date|string} date2 - The second date.
 * @param {string} unit - The unit ('ms', 'seconds', 'minutes', 'hours', 'days').
 * @returns {number} - The difference in the specified unit.
 */
export function getDateDifference(date1, date2, unit = "ms") {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffMs = Math.abs(d2.getTime() - d1.getTime())

  switch (unit) {
    case "seconds":
      return Math.floor(diffMs / 1000)
    case "minutes":
      return Math.floor(diffMs / (1000 * 60))
    case "hours":
      return Math.floor(diffMs / (1000 * 60 * 60))
    case "days":
      return Math.floor(diffMs / (1000 * 60 * 60 * 24))
    default:
      return diffMs
  }
}

/**
 * Add time to a date.
 * @param {Date|string} date - The base date.
 * @param {number} amount - The amount to add.
 * @param {string} unit - The unit ('ms', 'seconds', 'minutes', 'hours', 'days').
 * @returns {Date} - The new date with added time.
 */
export function addTimeToDate(date, amount, unit = "ms") {
  const baseDate = new Date(date)
  let milliseconds = amount

  switch (unit) {
    case "seconds":
      milliseconds = amount * 1000
      break
    case "minutes":
      milliseconds = amount * 1000 * 60
      break
    case "hours":
      milliseconds = amount * 1000 * 60 * 60
      break
    case "days":
      milliseconds = amount * 1000 * 60 * 60 * 24
      break
  }

  return new Date(baseDate.getTime() + milliseconds)
}

/**
 * Format a date as ISO string (for API serialization).
 * @param {Date|string|number} date - The date to format.
 * @returns {string} - The ISO formatted date string.
 */
export function formatDateAsISO(date) {
  return new Date(date).toISOString()
}

/**
 * Format a date for MongoDB (Date object).
 * @param {Date|string|number} date - The date to format.
 * @returns {Date} - The Date object for MongoDB.
 */
export function formatDateForMongo(date) {
  return new Date(date)
}
