// Role Authorization Middleware
// TODO: Restrict access based on user roles (Admin, Staff, Trainer)
// Role Authorization Middleware
// TODO: Restrict access based on user roles (Admin, Staff, Trainer)

const AppError = require("../utils/AppError");

const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return next(
                new AppError(
                    "Not authorized to access this route",
                    401
                )
            );
        }

        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You do not have permission to access this route",
                    403
                )
            );
        }

        next();
    };
};

module.exports = {
    authorizeRoles
};