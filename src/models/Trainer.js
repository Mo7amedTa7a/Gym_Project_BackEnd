const mongoose = require("mongoose");
const validator = require("validator");

const trainerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user"],
        },
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

        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
            trim: true
        },

        specialization: {
            type: String,
            required: [true, "Please provide specialization"],
            trim: true
        },

        experience: {
            type: Number,
            required: [true, "Please provide experience (in years)"],
            min: 0
        },

        profileImage: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Trainer", trainerSchema);
