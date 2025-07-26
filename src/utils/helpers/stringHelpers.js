
/**
 * Calculer un pourcentage avec gestion des divisions par zéro
 * @param {number} part - La partie à calculer.
 * @param {number} total - Le total.
 * @returns {number} - Le pourcentage calculé avec deux décimales.
 */
export function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return Math.round((part / total) * 100 * 100) / 100; // 2 décimales
}

// Obtenir une fenêtre de temps
/**
 * Obtenir une fenêtre de temps basée sur le nombre de minutes précédant la date actuelle.
 * @param {number} minutes - Le nombre de minutes antérieures à la date actuelle.
 * @returns {Object} - Un objet contenant les dates de début et de fin.
 */
export function getTimeWindow(minutes) {
  const now = new Date();
  const startTime = new Date(now.getTime() - (minutes * 60 * 1000));
  return { startTime, endTime: now };
}

// Formater une date en string lisible
/**
 * Formater une date en chaîne de caractères lisible en français.
 * @param {Date|string} date - La date à formater.
 * @returns {string} - La date formatée.
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

// Formater une date pour MongoDB (ISO string)
/**
 * Formater une date en chaîne ISO pour MongoDB.
 * @param {Date|string} date - La date à formater.
 * @returns {string} - La date formatée en ISO.
 */
export function formatDateForMongo(date) {
  return new Date(date).toISOString();
}

// Valider un niveau de log
/**
 * Valider si un niveau de log est valide.
 * @param {string} level - Le niveau de log à valider.
 * @returns {boolean} - True si le niveau est valide, false sinon.
 */
export function isValidLogLevel(level) {
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  return validLevels.includes(level?.toLowerCase());
}

// Obtenir la couleur selon le niveau de log
/**
 * Obtenir la couleur correspondant à un niveau de log.
 * @param {string} level - Le niveau de log.
 * @returns {string} - La couleur hexadécimale.
 */
export function getLogLevelColor(level) {
  const colors = {
    debug: '#6b7280',   // gris
    info: '#10b981',    // vert
    warn: '#f59e0b',    // orange
    error: '#dc2626',   // rouge
    fatal: '#7c2d12'    // rouge foncé
  };
  return colors[level?.toLowerCase()] || '#6b7280';
}

// Formater la taille en bytes
/**
 * Formater une taille en bytes en une chaîne lisible.
 * @param {number} bytes - La taille en bytes.
 * @returns {string} - La taille formatée.
 */
export function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Formater la durée en millisecondes
/**
 * Formater une durée en millisecondes en une chaîne lisible.
 * @param {number} ms - La durée en millisecondes.
 * @returns {string} - La durée formatée.
 */
export function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  return `${(ms / 3600000).toFixed(1)}h`;
}

// Générer un ID unique simple
/**
 * Générer un ID unique simple.
 * @returns {string} - L'ID généré.
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Valider une adresse email
/**
 * Valider une adresse email.
 * @param {string} email - L'adresse email à valider.
 * @returns {boolean} - True si l'email est valide, false sinon.
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Nettoyer et valider les paramètres de requête
/**
 * Nettoyer et valider les paramètres de requête.
 * @param {Object} query - Les paramètres de requête à nettoyer et valider.
 * @returns {Object} - Les paramètres de requête nettoyés et validés.
 */
export function sanitizeQueryParams(query) {
  const sanitized = {};
  
  // Limite par défaut
  if (query.limit) {
    const limit = parseInt(query.limit);
    sanitized.limit = Math.min(Math.max(limit, 1), 1000); // Entre 1 et 1000
  } else {
    sanitized.limit = 100;
  }
  
  // Offset par défaut
  if (query.offset) {
    const offset = parseInt(query.offset);
    sanitized.offset = Math.max(offset, 0); // Minimum 0
  } else {
    sanitized.offset = 0;
  }
  
  // Fenêtre de temps
  if (query.timeWindow) {
    const timeWindow = parseInt(query.timeWindow);
    sanitized.timeWindow = Math.min(Math.max(timeWindow, 1), 1440); // Entre 1 minute et 24h
  }
  
  // Niveau de log
  if (query.level && isValidLogLevel(query.level)) {
    sanitized.level = query.level.toLowerCase();
  }
  
  return sanitized;
}

// Créer une réponse d'erreur standardisée
/**
 * Créer une réponse d'erreur standardisée.
 * @param {string} message - Le message d'erreur.
 * @param {string} [code='INTERNAL_ERROR'] - Le code d'erreur.
 * @param {any} [details=null] - Les détails de l'erreur.
 * @returns {Object} - La réponse d'erreur.
 */
export function createErrorResponse(message, code = 'INTERNAL_ERROR', details = null) {
  const error = {
    error: true,
    code,
    message,
    timestamp: new Date().toISOString()
  };
  
  if (details) {
    error.details = details;
  }
  
  return error;
}

// Créer une réponse de succès standardisée
/**
 * Créer une réponse de succès standardisée.
 * @param {any} data - Les données de la réponse.
 * @param {string} [message='Success'] - Le message de succès.
 * @returns {Object} - La réponse de succès.
 */
export function createSuccessResponse(data, message = 'Success') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}

// Débouncer une fonction (éviter les appels trop fréquents)
/**
 * Débouncer une fonction pour éviter les appels trop fréquents.
 * @param {Function} func - La fonction à débouncer.
 * @param {number} wait - Le délai d'attente entre les appels.
 * @returns {Function} - La fonction débouncée.
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

// Retry avec backoff exponentiel
/**
 * Réessayer une fonction avec un backoff exponentiel.
 * @param {Function} fn - La fonction à réessayer.
 * @param {number} [maxRetries=3] - Le nombre maximal de tentatives.
 * @param {number} [baseDelay=1000] - Le délai de base entre les tentatives.
 * @returns {Promise<any>} - Le résultat de la fonction.
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
/**
 * Grouper des éléments par une clé spécifique.
 * @param {Array} array - Le tableau d'éléments à grouper.
 * @param {string} key - La clé par laquelle grouper les éléments.
 * @returns {Object} - Les éléments groupés.
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

// Calculer des statistiques de base sur un tableau de nombres
/**
 * Calculer des statistiques de base sur un tableau de nombres.
 * @param {Array<number>} numbers - Le tableau de nombres.
 * @returns {Object} - Les statistiques calculées.
 */
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
