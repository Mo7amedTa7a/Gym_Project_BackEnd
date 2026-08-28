const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
    createMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember
} = require("../controllers/memberController");


// Routes

router.route("/")
    .get(
        verifyToken,
        authorizeRoles("Admin", "Staff", "Trainer"),
        getMembers
    )
    .post(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        createMember
    );

router.route("/:id")
    .get(
        verifyToken,
        authorizeRoles("Admin", "Staff", "Trainer"),
        getMember
    )
    .put(
        verifyToken,
        authorizeRoles("Admin", "Staff"),
        updateMember
    )
    .delete(
        verifyToken,
        authorizeRoles("Admin"),
        deleteMember
    );


module.exports = router;
