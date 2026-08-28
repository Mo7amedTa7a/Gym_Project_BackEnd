const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please provide a valid email"]
        },

        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 6,
            select: false
        },

        role: {
            type: String,
            enum: ["Admin", "Staff", "Trainer"],
            default: "Staff"
        },

        isActive: {
            type: Boolean,
            default: true
        },

        resetPasswordToken: String,

        resetPasswordExpire: Date,

        lastLogin: Date
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;