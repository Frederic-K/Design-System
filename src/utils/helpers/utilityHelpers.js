
/**
 * Format bytes into a human-readable string.
 * @param {number} bytes - The number of bytes.
 * @returns {string} - The formatted string.
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format duration in milliseconds into a human-readable string.
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} - The formatted duration string.
 */
export function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}

/**
 * Generate a simple unique ID.
 * @returns {string} - The generated ID.
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Debounce a function to prevent it from being called too frequently.
 * @param {function} func - The function to debounce.
 * @param {number} wait - The debounce wait time in milliseconds.
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
 * @param {number} [baseDelay=1000] - The base delay in milliseconds.
 * @returns {Promise} - The result of the function if successful.
 * @throws {Error} - The error if all retries fail.
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

// Grouper des éléments par clé
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

// Calculer des statistiques de base sur un tableau de nombres
export function calculateStats(numbers) {
  if (!numbers || numbers.length === 0) {
    return { min: 0, max: 0, avg: 0, sum: 0, count: 0 };
  }
  
  const sum = numbers.reduce((a, b) => a + b, 0);
  const avg = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  
  return {
    min,
    max,
    avg: Math.round(avg * 100) / 100,
    sum,
    count: numbers.length
  };
}

// Vérifier si une chaîne est un JSON valide
export function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Tronquer un texte avec ellipses
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
