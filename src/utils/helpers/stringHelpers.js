/**
 * Truncate text with ellipses if it exceeds a maximum length.
 * @param {string} text - The text to truncate.
 * @param {number} [maxLength=100] - The maximum length of the text.
 * @returns {string} - The truncated text.
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + "..."
}

/**
 * Removes diacritical marks (accents) from a string.
 * @function stripAccents
 * @param {string} [s=""] - The input string.
 * @returns {string} - The string with diacritical marks removed.
 * @example
 * stripAccents("Café") // Returns "Cafe"
 */
export const stripAccents = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

/**
 * Normalizes a string by removing diacritical marks, converting to lowercase, and trimming leading/trailing spaces.
 * @function norm
 * @param {string} [s=""] - The input string.
 * @returns {string} - The normalized string.
 * @example
 * norm("Café") // Returns "cafe"
 */
export const norm = (s = "") => stripAccents(s).toLowerCase().trim()

/**
 * Splits a string into an array of trimmed parts based on a delimiter.
 * @param {string} str - The input string.
 * @param {RegExp|string} delimiter - The delimiter to split the string.
 * @returns {string[]} - The array of trimmed parts.
 * @example
 * splitAndTrim("  Hello,   World!  ", " ") // Returns ["Hello,", "World!"]
 * splitAndTrim("   Hello,   World!   ", /\s+/) // Returns ["Hello,", "World!"]
 */
export function splitAndTrim(str, delimiter) {
  return str
    .split(delimiter)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}
