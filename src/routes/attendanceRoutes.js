const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");

const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
    checkIn,
    checkOut,
    getMemberAttendance,
    getAttendanceList
} = require("../controllers/attendanceController");


router.post(
    "/check-in",
    verifyToken,
    authorizeRoles("Admin", "Staff", "Trainer"),
    checkIn
);


router.patch(
    "/:id/check-out",
    verifyToken,
    authorizeRoles("Admin", "Staff", "Trainer"),
    checkOut
);


router.get(
    "/member/:memberid",
    verifyToken,
    authorizeRoles("Admin", "Staff", "Trainer"),
    getMemberAttendance
);


router.get(
    "/",
    verifyToken,
    authorizeRoles("Admin", "Staff"),
    getAttendanceList
);


module.exports = router;
