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
 * @param {string} [string=""] - The input string. (default to empty string to avoid "if (!str) return")
 * @returns {string} - The string with diacritical marks removed.
 * @example
 * stripAccents("Café") // Returns "Cafe"
 */
export function stripAccents(string = "") {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Normalizes a string by trimming whitespace, converting to uppercase, and removing diacritical marks.
 * @param {string} str - The input string to normalize.
 * @returns {string} - The normalized string (trimmed, uppercase, without accents).
 * @example
 * normalizeString("  Café français  ") // Returns "CAFE FRANCAIS"
 * normalizeString("") // Returns ""
 * normalizeString(null) // Returns ""
 */
export function normalizeString(string) {
  if (!string) return ""

  return string
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

/**
 * Splits a string into an array of trimmed parts based on a delimiter.
 * @param {string} str - The input string.
 * @param {RegExp|string} delimiter - The delimiter to split the string.
 * @returns {string[]} - The array of trimmed parts.
 * @example
 * splitAndTrim("  Hello,   World!  ", " ") // Returns ["Hello,", "World!"]
 * splitAndTrim("   Hello,   World!   ", /\s+/) // Returns ["Hello,", "World!"]
 */
export function splitAndTrim(string, delimiter) {
  return string
    .split(delimiter)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}
