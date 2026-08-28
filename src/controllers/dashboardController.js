// Dashboard Controller
// TODO: Implement getDashboardStats (totalMembers, activeMembers, expiredMembers, activeSubscriptions, expiredSubscriptions, totalTrainers, todayAttendance)
const Attendance = require("../models/Attendance");
const Member = require("../models/Member");
const Subscription = require("../models/Subscription");
const Trainer = require("../models/Trainer");


const getDashboardStats = async (req, res) => {

    try {

        const total_Members = await Member.countDocuments();

        const active_Subscriptions = await Subscription.countDocuments({status: "Active"});

        const expired_Subscriptions = await Subscription.countDocuments({status: "expired"});

        const total_Trainers = await Trainer.countDocuments();


        const start_date = new Date();
        const end_date = new Date();

        start_date.setHours(0, 0, 0, 0);

        end_date.setHours(0, 0, 0, 0);
        end_date.setDate(end_date.getDate() + 1);


        const today_Attendance = await Attendance.countDocuments({
            checkIn: {
                $gte: start_date,
                $lt: end_date
            }
        });


        const active_Members = await Subscription.countDocuments({status: "Active"});

        const expired_Members = await Subscription.countDocuments({ status: "expired" });


        return res.status(200).json({
            total_Members,
            active_Members,
            expired_Members,
            active_Subscriptions,
            expired_Subscriptions,
            total_Trainers,
            today_Attendance
        });


    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });

    }
};


module.exports = getDashboardStats