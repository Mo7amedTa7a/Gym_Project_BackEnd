// Auth Middleware
// TODO: Protect routes with JWT verification

const jwt = require("jsonwebtoken");
const asyncWrapper = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const User = require("../models/User");

const verifyToken = asyncWrapper(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(
            new AppError(
                "Not authorized to access this route",
                401
            )
        );
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return next(
                new AppError("Token expired", 401)
            );
        }

        return next(
            new AppError("Invalid token", 401)
        );
    }

    const user = await User
        .findById(decoded.id)
        .select("-password");

    if (!user) {
        return next(
            new AppError(
                "The user belonging to this token no longer exists",
                401
            )
        );
    }

    if (!user.isActive) {
        return next(
            new AppError(
                "Your account is inactive",
                403
            )
        );
    }

    req.user = user;

    next();
});

module.exports = {
    verifyToken
};