class CustomError extends Error {
  constructor(status, message, code) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.status = status || 500;
    this.code = code || this._rawErrorCode(this.status);
  }

  _rawErrorCode(status) {
    const rawErrorCode = {
      400: "BAD_REQUEST",
      401: "UNAUTHORIZED",
      403: "FORBIDDEN",
      404: "NOT_FOUND",
      409: "CONFLICT",
      429: "TOO_MANY_REQUEST",
      500: "INTERNAL_SERVER_ERROR",
    };
    return rawErrorCode[status];
  }
}

module.exports = CustomError;
