// Member Model Schema
// TODO: Define Member Schema (name, email, phone, gender, dateOfBirth, address, emergencyContact, profileImage, status, joinedAt, trainer)
const mongoose = require("mongoose");
const validator = require("validator");

const memberSchema = new mongoose.Schema(
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

        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
            trim: true
        },

        gender: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Please provide gender"]
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Please provide date of birth"]
        },

        address: {
            type: String,
            required: [true, "Please provide an address"],
            trim: true
        },

        emergencyContact: {
            type: String,
            required: [true, "Please provide an emergency contact"],
            trim: true
        },

        profileImage: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },

        joinedAt: {
            type: Date,
            default: Date.now
        },

        trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainer",
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Member", memberSchema);