// Auth Routes
// TODO: Define Express router for authentication (/api/auth)
const express = require("express");

const router = express.Router();

const {
    register,
    login,
    logout,
    getMe,
    changePassword,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");


// Public Routes

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token", resetPassword);


// Protected Routes

router.post("/logout", verifyToken, logout);

router.get("/me", verifyToken, getMe);

router.patch(
    "/change-password",
    verifyToken,
    changePassword
);


module.exports = router;