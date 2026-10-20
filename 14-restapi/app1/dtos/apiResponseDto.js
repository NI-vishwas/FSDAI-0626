const createSuccessResponse = ({ message = "Success", data = null, meta = null } = {}) => ({
  success: true,
  message,
  data,
  meta,
  timestamp: new Date().toISOString()
});

const createErrorResponse = ({ message = "Request failed", errors = null } = {}) => ({
  success: false,
  message,
  errors,
  timestamp: new Date().toISOString()
});

module.exports = {
  createSuccessResponse,
  createErrorResponse
};
