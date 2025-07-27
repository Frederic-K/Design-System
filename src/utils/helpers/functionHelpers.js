
/**
 * Debounce a function to prevent it from being called too frequently.
 * @param {function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {function} - The debounced function.
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Retry a function with exponential backoff.
 * @param {function} fn - The function to retry.
 * @param {number} [maxRetries=3] - The maximum number of retries.
 * @param {number} [baseDelay=1000] - The base delay for the backoff.
 * @returns {Promise<any>} - A promise resolved by the successful function.
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`❌ Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Group elements by a key.
 * @param {Array} array - The array of elements to group.
 * @param {string} key - The key to group by.
 * @returns {object} - The elements grouped by key.
 */
export function groupBy(array, key) {
  return array.reduce((groups, item) => {
    const group = item[key];
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {});
}
