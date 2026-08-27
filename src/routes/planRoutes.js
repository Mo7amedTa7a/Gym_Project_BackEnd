// Plan Routes
// TODO: Define Express router for gym plans management (/api/plans)
const express = require("express");

const router = express.Router();

const {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
} = require("../controllers/planController");

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
    "/",
    verifyToken,
    authorizeRoles("Admin", "Staff", "Trainer"),
    getPlans
);


router.get(
    "/:id",
    verifyToken,
    authorizeRoles("Admin", "Staff", "Trainer"),
    getPlanById
);


router.post(
    "/",
    verifyToken,
    authorizeRoles("Admin"),
    createPlan
);


router.patch(
    "/:id",
    verifyToken,
    authorizeRoles("Admin"),
    updatePlan
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Admin"),
    deletePlan
);


module.exports = router;