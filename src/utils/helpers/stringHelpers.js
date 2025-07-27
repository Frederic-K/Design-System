
/**
 * Truncate text with ellipses if it exceeds a maximum length.
 * @param {string} text - The text to truncate.
 * @param {number} [maxLength=100] - The maximum length of the text.
 * @returns {string} - The truncated text.
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
