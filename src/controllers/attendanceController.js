// Attendance Controller
// TODO: Implement checkIn, checkOut, getMemberAttendance, getAttendanceList
// Attendance Controller
// TODO: Implement checkIn, checkOut, getMemberAttendance, getAttendanceList

const Attendance = require("../models/Attendance");
const Member = require("../models/Member");
const Subscription = require("../models/Subscription");


const checkIn = async (req, res) => {

    try {

        const { member } = req.body;

        const checkmember = await Member.findById(member);

        if (!checkmember) {
            return res.status(404).json({
                message: "Member does not exist"
            });
        }

        const checkSubscription = await Subscription.findOne({ member });

        if (!checkSubscription) {
            return res.status(404).json({
                message: "Subscription does not exist"
            });
        }

        if (checkSubscription.status !== "Active") {
            return res.status(400).json({
                message: "Subscription is not active"
            });
        }

        const oldcheckin = await Attendance.findOne({
            member: member,
            checkOut: null
        });

        if (oldcheckin) {
            return res.status(403).json({
                message: "Member already has an open check-in"
            });
        }

        const newAttendance = await Attendance.create({
            member: member,
            checkIn: new Date()
        });

        return res.status(201).json({
            message: "Check-in successful",
            attendance: newAttendance
        });

        

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });

    }
};


const checkOut = async (req, res) => {

    try {

        const { id } = req.params;

        const attendance = await Attendance.findOne({_id:id,checkOut:null});

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance does not exist"
            });
        }

        await Attendance.updateOne(
            { _id: id, checkOut: null },
            { $set: { checkOut: new Date() } }
        );


        return res.status(200).json({
            message:'Check-out successful'
        })



        

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};




const getMemberAttendance = async (req, res) => {

    try {

        const { memberid } = req.params;

        const member = await Member.findById(memberid);

        if (!member) {
            return res.status(404).json({
                message: "Member does not exist"
            });
        }

        const attendes = await Attendance.find({
            member: memberid
        });

        return res.status(200).json({
            message: "Successful",
            attendance: attendes
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });

    }
};



const getAttendanceList = async (req, res) => {

    try {

        const { memberid, date } = req.query;

        const filter = {};

        if (memberid) {
            filter.member = memberid;
        }

        if (date) {

            const startDate = new Date(date);
            const endDate = new Date(date);

            endDate.setDate(endDate.getDate() + 1);

            filter.checkIn = {
                $gte: startDate,
                $lt: endDate
            };
        }

        const attendens = await Attendance.find(filter);

        if (attendens.length === 0) {
            return res.status(404).json({
                message: "No attendance found"
            });
        }

        return res.status(200).json({
            message: "Successful",
            attendance: attendens
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });

    }
};

module.exports={checkIn,checkOut,getMemberAttendance,getAttendanceList}