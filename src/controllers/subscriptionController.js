// Subscription Controller
// TODO: Implement createSubscription, getSubscriptions, getSubscriptionById, updateSubscription, cancelSubscription


const Subscription = require('../models/Subscription');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Member = require('../models/Member');
const Plan = require('../models/Plan');




const createSubscription = asyncHandler(async (req, res, next) => {
    const {
        member,
        plan,
        startDate,
        endDate,
        price,
        status
    } = req.body;

    if (
        !member ||
        !plan ||
        !startDate ||
        !endDate ||
        price === undefined
    ) {
        return next(
            new AppError(
                'All fields are required',
                400
            )
        );
    }

    const memberExists = await Member.findById(member);
    if (!memberExists) {
        return next(
            new AppError(
                'Member Not Found',
                404
            )
        );
    }

    const planExists = await Plan.findById(plan);
    if (!planExists) {
        return next(
            new AppError(
                'Plan Not Found',
                404
            )
        );
    }
    const subscription = await Subscription.create({
        member,
        plan,
        startDate,
        endDate,
        price,
        status
    });

    return res.status(201).json({
        success: true,
        message: 'Subscription created successfully',
        data: subscription
    });
});



const getSubscriptions = asyncHandler(async (req, res) => {
    const subscriptions = await Subscription.find().populate("member")
        .populate("plan");

    return res.status(200).json({
        success: true,
        message: 'All Subscriptions',
        data: subscriptions
    });
});



const getSubscriptionById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const subscription = await Subscription.findById(id)
        .populate("member")
        .populate("plan");

    if (!subscription) {
        return next(
            new AppError('Subscription Not Found', 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: 'Subscription Found',
        data: subscription
    });
});



const updateSubscription = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const subscription = await Subscription.findByIdAndUpdate(
        id,
        req.body,
        {
            returnDocument: 'after',
            runValidators: true
        }
    ).populate("member")
        .populate("plan");

    if (!subscription) {
        return next(
            new AppError('Subscription Not Found', 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: 'Subscription Updated',
        data: subscription
    });
});



const cancelSubscription = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const subscription = await Subscription.findByIdAndUpdate(
        id,
        {
            status: 'Cancelled'
        },
        {
            returnDocument: 'after',
            runValidators: true
        }
    ).populate("member")
        .populate("plan");

    if (!subscription) {
        return next(
            new AppError('Subscription Not Found', 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: 'Subscription Cancelled',
        data: subscription
    });
});


module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    cancelSubscription
};