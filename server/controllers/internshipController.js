const Internship = require("../models/Internship");

// ==========================================
// CREATE INTERNSHIP
// ==========================================
const createInternship = async (req, res) => {
    try {
        const {
            title,
            company,
            description,
            location,
            skills,
            stipend,
            duration,
            deadline
        } = req.body;

        // Check required fields
        if (
            !title ||
            !company ||
            !description ||
            !location ||
            !skills ||
            !duration ||
            !deadline
        ) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        // Create internship
        const internship = await Internship.create({
            title,
            company,
            description,
            location,
            skills,
            stipend: stipend || 0,
            duration,
            deadline,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Internship created successfully",
            internship
        });

    } catch (error) {
        console.error("Create Internship Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// UPDATE INTERNSHIP
// ==========================================
const updateInternship = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            company,
            description,
            location,
            skills,
            stipend,
            duration,
            deadline,
            status
        } = req.body;

        // Find internship
        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        // Update only fields provided
        if (title !== undefined) {
            internship.title = title;
        }

        if (company !== undefined) {
            internship.company = company;
        }

        if (description !== undefined) {
            internship.description = description;
        }

        if (location !== undefined) {
            internship.location = location;
        }

        if (skills !== undefined) {
            internship.skills = skills;
        }

        if (stipend !== undefined) {
            internship.stipend = stipend;
        }

        if (duration !== undefined) {
            internship.duration = duration;
        }

        if (deadline !== undefined) {
            internship.deadline = deadline;
        }

        if (status !== undefined) {
            internship.status = status;
        }

        // Save changes
        await internship.save();

        res.status(200).json({
            message: "Internship updated successfully",
            internship
        });

    } catch (error) {
        console.error("Update Internship Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// GET ALL INTERNSHIPS
// ==========================================
const getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Internships fetched successfully",
            count: internships.length,
            internships
        });

    } catch (error) {
        console.error("Get All Internships Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// GET INTERNSHIP BY ID
// ==========================================
const getInternshipById = async (req, res) => {
    try {
        const { id } = req.params;

        const internship = await Internship.findById(id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.status(200).json({
            message: "Internship fetched successfully",
            internship
        });

    } catch (error) {
        console.error("Get Internship By ID Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
    createInternship,
    updateInternship,
    getAllInternships,
    getInternshipById
};