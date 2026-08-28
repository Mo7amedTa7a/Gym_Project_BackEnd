const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
    createTrainer,
    getTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer
} = require("../controllers/trainerController");

router.route("/")
    .post(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        createTrainer
    )
    .get(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        getTrainers
    );

router.route("/:id")
    .get(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        getTrainerById
    )
    .put(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        updateTrainer
    )
    .delete(
        verifyToken,
        authorizeRoles("Admin"),
        deleteTrainer
    );

module.exports = router;
