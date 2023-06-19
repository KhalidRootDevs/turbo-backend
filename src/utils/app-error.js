const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(name, statusCode, description, isOperational) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

// API Specific Errors
class APIError extends AppError {
  constructor(
    name,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

// 400
class BadRequestError extends AppError {
  constructor(description = "Bad request", loggingErrorResponse) {
    super(
      "Bad Request",
      STATUS_CODES.BAD_REQUEST,
      description,
      true
    );
    this.loggingErrorResponse = loggingErrorResponse;
  }
}

// 400
class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack) {
    super(
      "Validation Error",
      STATUS_CODES.BAD_REQUEST,
      description,
      true
    );
    this.errorStack = errorStack;
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
