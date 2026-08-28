// Member Controller
// TODO: Implement createMember, getMembers, getMember,
// updateMember, deleteMember

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Trainer = require("../models/Trainer");
const Member = require("../models/Member");


const createMember = asyncHandler(async (req, res, next) => {

    const {
        name,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        emergencyContact,
        profileImage,
        status,
        trainer
    } = req.body;


    if (
        !name ||
        !email ||
        !phone ||
        !gender ||
        !dateOfBirth ||
        !address ||
        !emergencyContact
    ) {
        return next(
            new AppError(
                "Name, email, phone, gender, dateOfBirth, address and emergencyContact are required",
                400
            )
        );
    }


    if (trainer) {

        const trainerExists = await Trainer.findById(trainer);

        if (!trainerExists) {
            return next(
                new AppError("Trainer Not Found", 404)
            );
        }
    }


    const member = await Member.create({
        name,
        email,
        phone,
        gender,
        dateOfBirth,
        address,
        emergencyContact,
        profileImage,
        status,
        trainer
    });


    return res.status(201).json({
        success: true,
        message: "Member created successfully",
        data: member
    });
});


const getMembers = asyncHandler(async (req, res, next) => {

    const {
        search,
        status,
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc"
    } = req.query;


    const filter = {};


    if (req.user.role === "Trainer") {

        const trainer = await Trainer.findOne({
            user: req.user.id
        });

        if (!trainer) {
            return next(
                new AppError(
                    "Trainer profile not found",
                    404
                )
            );
        }

        filter.trainer = trainer._id;
    }

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

    if (status) {
        filter.status = status;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const sortObject = {};

    sortObject[sort] = order === "asc" ? 1 : -1;


    const members = await Member.find(filter)
        .populate("trainer")
        .sort(sortObject)
        .skip(skip)
        .limit(limitNumber);


    const total = await Member.countDocuments(filter);


    return res.status(200).json({
        success: true,
        message: "All Members",
        total,
        page: pageNumber,
        limit: limitNumber,
        data: members
    });
});



const getMember = asyncHandler(async (req, res, next) => {

    const { id } = req.params;


    const member = await Member.findById(id)
        .populate("trainer");


    if (!member) {
        return next(
            new AppError(
                "Member Not Found",
                404
            )
        );
    }


    if (req.user.role === "Trainer") {

        const trainer = await Trainer.findOne({
            user: req.user.id
        });

        if (!trainer) {
            return next(
                new AppError(
                    "Trainer profile not found",
                    404
                )
            );
        }


        if (
            !member.trainer ||
            member.trainer._id.toString() !== trainer._id.toString()
        ) {
            return next(
                new AppError(
                    "You are not authorized to access this member",
                    403
                )
            );
        }
    }


    return res.status(200).json({
        success: true,
        message: "Member Found",
        data: member
    });
});


const updateMember = asyncHandler(async (req, res, next) => {

    const { id } = req.params;

    if (req.body.trainer) {

        const trainerExists = await Trainer.findById(
            req.body.trainer
        );

        if (!trainerExists) {
            return next(
                new AppError(
                    "Trainer Not Found",
                    404
                )
            );
        }
    }


    const member = await Member.findByIdAndUpdate(
        id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true
        }
    ).populate("trainer");


    if (!member) {
        return next(
            new AppError(
                "Member Not Found",
                404
            )
        );
    }


    return res.status(200).json({
        success: true,
        message: "Member Updated Successfully",
        data: member
    });
});


const deleteMember = asyncHandler(async (req, res, next) => {

    const { id } = req.params;


    const member = await Member.findByIdAndUpdate(
        id,
        {
            status: "inactive"
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    ).populate("trainer");


    if (!member) {
        return next(
            new AppError(
                "Member Not Found",
                404
            )
        );
    }


    return res.status(200).json({
        success: true,
        message: "Member Deactivated Successfully",
        data: member
    });
});


module.exports = {
    createMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember
};