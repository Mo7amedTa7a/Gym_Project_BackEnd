// Subscription Routes
// TODO: Define Express router for subscriptions management (/api/subscriptions)

const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    cancelSubscription
} = require("../controllers/subscriptionController");


// Get all subscriptions + Create subscription
router.route("/")
    .get(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        getSubscriptions
    )
    .post(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        createSubscription
    );


// Get one + Update + Cancel
router.route("/:id")
    .get(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        getSubscriptionById
    )
    .put(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        updateSubscription
    )
    .delete(
        verifyToken,
        authorizeRoles("Admin"),
        cancelSubscription
    );


module.exports = router;
