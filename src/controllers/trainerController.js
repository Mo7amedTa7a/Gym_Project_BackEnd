// Trainer Controller
// TODO: Implement createTrainer, getTrainers, getTrainerById, updateTrainer, deleteTrainer
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Trainer = require("../models/Trainer");
const User = require("../models/User");


const createTrainer = asyncHandler(async (req, res, next) => {

    const {
        user,
        name,
        email,
        phone,
        specialization,
        experience,
        profileImage
    } = req.body;


    if (
        !user ||
        !name ||
        !email ||
        !phone ||
        !specialization ||
        experience === undefined
    ) {
        return next(
            new AppError(
                "User, name, email, phone, specialization and experience are required",
                400
            )
        );
    }


    const existingUser = await User.findById(user);

    if (!existingUser) {
        return next(
            new AppError("User Not Found", 404)
        );
    }


    if (existingUser.role !== "Trainer") {
        return next(
            new AppError(
                "This user does not have Trainer role",
                400
            )
        );
    }


    const existingTrainer = await Trainer.findOne({ user });

    if (existingTrainer) {
        return next(
            new AppError(
                "This user already has a Trainer profile",
                400
            )
        );
    }


    const trainer = await Trainer.create({
        user,
        name,
        email,
        phone,
        specialization,
        experience,
        profileImage
    });


    return res.status(201).json({
        success: true,
        message: "Trainer created successfully",
        data: trainer
    });
});


const getTrainers = asyncHandler(async (req, res) => {

    const {
        search,
        specialization,
        status,
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc"
    } = req.query;

    const filter = {};

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                phone: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    if (specialization) {
        filter.specialization = specialization;
    }

    if (status) {
        filter.status = status;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const sortObject = {};
    sortObject[sort] = order === "asc" ? 1 : -1;

    const trainers = await Trainer.find(filter)
        .populate("user", "name email role")
        .sort(sortObject)
        .skip(skip)
        .limit(limitNumber);

    const total = await Trainer.countDocuments(filter);

    return res.status(200).json({
        success: true,
        message: "All Trainers",
        total,
        page: pageNumber,
        limit: limitNumber,
        data: trainers
    });
});

const getTrainerById = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const trainer = await Trainer.findById(id)
        .populate("user", "name email role");

    if (!trainer) {
        return next(
            new AppError("Trainer Not Found", 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: "Trainer Found",
        data: trainer
    });
});


const updateTrainer = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const {
        name,
        email,
        phone,
        specialization,
        experience,
        profileImage,
        status
    } = req.body;

    const trainer = await Trainer.findByIdAndUpdate(
        id,
        {
            name,
            email,
            phone,
            specialization,
            experience,
            profileImage,
            status
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!trainer) {
        return next(
            new AppError("Trainer Not Found", 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: "Trainer Updated Successfully",
        data: trainer
    });
});

const deleteTrainer = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    const trainer = await Trainer.findByIdAndUpdate(
        id,
        {
            status: "inactive"
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!trainer) {
        return next(
            new AppError("Trainer Not Found", 404)
        );
    }

    return res.status(200).json({
        success: true,
        message: "Trainer Deactivated Successfully",
        data: trainer
    });
});


module.exports = {
    createTrainer,
    getTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer
};