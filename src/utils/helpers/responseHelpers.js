
/**
 * Create a standardized error response.
 * @param {string} message - The error message.
 * @param {string} [code='INTERNAL_ERROR'] - The error code.
 * @param {any} [details=null] - Additional error details.
 * @returns {object} - The error response object.
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

/**
 * Create a standardized success response.
 * @param {any} data - The response data.
 * @param {string} [message='Success'] - The success message.
 * @returns {object} - The success response object.
 */
export function createSuccessResponse(data, message = 'Success') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
}
