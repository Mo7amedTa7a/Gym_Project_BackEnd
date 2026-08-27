// Plan Controller
// TODO: Implement createPlan, getPlans, getPlanById, updatePlan, deletePlan

const Plan = require("../models/Plan");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");



const getPlans = asyncHandler(async (req, res) => {

    const plans = await Plan.find();

    return res.status(200).json({
        success: true,
        message: "All Plans",
        data: plans
    });
});



const getPlanById = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
        return next(
            new AppError("Plan Not Found", 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: "Plan Found",
        data: plan
    });
});



const createPlan = asyncHandler(async (req, res, next) => {

    const {
        name,
        description,
        price,
        duration,
        features,
        status
    } = req.body;

    if (
        !name ||
        !description ||
        price === undefined ||
        duration === undefined
    ) {
        return next(
            new AppError(
                "Name, description, price and duration are required",
                400
            )
        );
    }

    const newPlan = await Plan.create({
        name,
        description,
        price,
        duration,
        features,
        status
    });

    return res.status(201).json({
        success: true,
        message: "Plan created successfully",
        data: newPlan
    });
});





const updatePlan = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const plan = await Plan.findByIdAndUpdate(
        id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!plan) {
        return next(
            new AppError("Plan Not Found", 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: "Plan Updated",
        data: plan
    });
});





const deletePlan = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const plan = await Plan.findByIdAndUpdate(
        id,
        {
            status: false
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!plan) {
        return next(
            new AppError("Plan Not Found", 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: "Plan Deactivated",
        data: plan
    });
});


module.exports = {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan
};