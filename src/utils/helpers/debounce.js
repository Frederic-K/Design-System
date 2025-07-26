
/**
 * Debounce a function to prevent it from being called too frequently.
 * @param {function} fn - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {function} - The debounced function.
 */
export function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
