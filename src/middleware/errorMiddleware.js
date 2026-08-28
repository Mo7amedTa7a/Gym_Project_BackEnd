// Global Error Handling Middleware
// TODO: Catch and format application errors
// (Validation, Auth, Mongoose, 500)

const errorMiddleware = (err, req, res, next) => {
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token expired"
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate field value entered"
        });
    }

    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors)
            .map(error => error.message);

        return res.status(400).json({
            success: false,
            message: messages.join(", ")
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    const statusCode = err.statusCode || 500;

    const message =
        err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorMiddleware;