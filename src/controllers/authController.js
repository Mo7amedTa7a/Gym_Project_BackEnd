// Auth Controller
// TODO: Implement register, login, logout, getMe, changePassword,
// forgotPassword, resetPassword

const asyncWrapper = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


// Register

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return next(
            new AppError(
                "Name, email and password are required",
                400
            )
        );
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return next(
            new AppError("User already exists", 400)
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });

    const token = jwt.sign(
        {
            id: newUser._id,
            email: newUser.email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token
    });
});


// Login

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new AppError(
                "Please provide email and password",
                400
            )
        );
    }

    const user = await User
        .findOne({ email })
        .select("+password");

    if (!user) {
        return next(
            new AppError(
                "Invalid email or password",
                401
            )
        );
    }

    const matchPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!matchPassword) {
        return next(
            new AppError(
                "Invalid email or password",
                401
            )
        );
    }

    user.lastLogin = new Date();

    await user.save();

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });
});


// Logout

const logout = asyncWrapper(async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logout successful"
    });
});


// Get Me

const getMe = asyncWrapper(async (req, res) => {
    return res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            isActive: req.user.isActive,
            lastLogin: req.user.lastLogin
        }
    });
});


// Change Password

const changePassword = asyncWrapper(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return next(
            new AppError(
                "Please provide old password and new password",
                400
            )
        );
    }

    if (newPassword.length < 6) {
        return next(
            new AppError(
                "New password must be at least 6 characters",
                400
            )
        );
    }

    const user = await User
        .findById(req.user._id)
        .select("+password");

    if (!user) {
        return next(
            new AppError("User not found", 404)
        );
    }

    const matchPassword = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if (!matchPassword) {
        return next(
            new AppError(
                "Old password is incorrect",
                401
            )
        );
    }
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully"
    });
});


// Forgot Password

const forgotPassword = asyncWrapper(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(
            new AppError(
                "Please provide an email",
                400
            )
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(
            new AppError(
                "User not found",
                404
            )
        );
    }

    const resetToken = crypto
        .randomBytes(32)
        .toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpire =
        Date.now() + 10 * 60 * 1000;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password reset token generated",
        resetToken
    });
});


// Reset Password

const resetPassword = asyncWrapper(async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
        return next(
            new AppError(
                "Please provide a reset token",
                400
            )
        );
    }

    if (!newPassword) {
        return next(
            new AppError(
                "Please provide a new password",
                400
            )
        );
    }

    if (newPassword.length < 6) {
        return next(
            new AppError(
                "New password must be at least 6 characters",
                400
            )
        );
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    });

    if (!user) {
        return next(
            new AppError(
                "Invalid or expired reset token",
                400
            )
        );
    }

    user.password = await bcrypt.hash(
        newPassword,
        10
    );

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password reset successful"
    });
});


module.exports = {
    register,
    login,
    logout,
    getMe,
    changePassword,
    forgotPassword,
    resetPassword
};