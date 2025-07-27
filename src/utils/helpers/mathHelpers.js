/**
 * Calculate a percentage with zero division handling and customizable decimal places.
 * @param {number} part - The part to calculate.
 * @param {number} total - The total value.
 * @param {number} [decimalPlaces=2] - The number of decimal places for the result.
 * @returns {number} - The calculated percentage with the specified number of decimal places.
 */
export function calculatePercentageWithDecimals(part, total, decimalPlaces = 2) {
  if (total === 0) return 0
  const factor = Math.pow(10, decimalPlaces)
  return Math.round((part / total) * 100 * factor) / factor
}

/**
 * Calculate a percentage with zero division handling.
 * @param {number} part - The part to calculate.
 * @param {number} total - The total value.
 * @returns {number} - The calculated percentage with two decimal places.
 */
export function calculatePercentage(part, total) {
  if (total === 0) return 0
  return Math.round((part / total) * 100 * 100) / 100 // 2 décimales
}

/**
 * Calculate basic statistics for an array of numbers.
 * @param {Array<number>} numbers - The array of numbers.
 * @returns {object} - The calculated statistics.
 */
export function calculateStats(numbers) {
  if (!numbers || numbers.length === 0) {
    return { min: 0, max: 0, avg: 0, sum: 0, count: 0 }
  }

  const sum = numbers.reduce((a, b) => a + b, 0)
  const avg = sum / numbers.length
  const min = Math.min(...numbers)
  const max = Math.max(...numbers)

  return {
    min,
    max,
    avg: Math.round(avg * 100) / 100,
    sum,
    count: numbers.length,
  }
}
