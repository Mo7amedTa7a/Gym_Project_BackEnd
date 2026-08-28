// Dashboard Routes
// TODO: Define Express router for dashboard statistics (/api/dashboard)

const express=require("express")

const router =express.Router()

const {verifyToken}=require("../middleware/authMiddleware")

const {authorizeRoles}=require("../middleware/roleMiddleware")
const getDashboardStats=require("../controllers/dashboardController")




router.get("/stats",verifyToken,authorizeRoles("Admin", "Staff"),getDashboardStats)


module.exports=router