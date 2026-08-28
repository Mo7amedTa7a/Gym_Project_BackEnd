// Attendance Model Schema
// TODO: Define Attendance Schema (member, checkIn, checkOut, date)


const mongoose=require("mongoose")
const Attendanceschema=new mongoose.Schema({
    member:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true

    },
    checkIn:{
        type:Date,
        required:true,
        default:Date.now
    },
    checkOut:{

        type:Date,
        default:null
    }


})



const Attendance=mongoose.model("Attendance",Attendanceschema)

module.exports=Attendance