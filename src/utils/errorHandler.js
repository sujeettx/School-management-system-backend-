// Custom Error Class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Capture stack trace for debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

// Middleware to handle errors globally
const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = {
    ErrorHandler,
    handleError,
};
