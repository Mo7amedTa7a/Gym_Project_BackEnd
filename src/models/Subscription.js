// Subscription Model Schema
// TODO: Define Subscription Schema (member, plan, startDate, endDate, price, status: Active, Expired, Pending, Cancelled)
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Pending', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
