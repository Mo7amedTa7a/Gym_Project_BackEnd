// Plan Model Schema
// TODO: Define Plan Schema (name, description, duration, price, features, status)

const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    features: { type: [String], default: [] },
    status: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema)