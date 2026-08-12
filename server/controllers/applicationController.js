const Application = require("../models/Application");

const createApplication = async (req, res) => {
    try {
        const { internshipTitle, companyName } = req.body;

        // Check required fields
        if (!internshipTitle || !companyName) {
            return res.status(400).json({
                message: "Internship title and company name are required"
            });
        }

        // Create application
        const application = await Application.create({
            student: req.user.id,
            internshipTitle,
            companyName
        });

        // Send response
        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error("Application Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            student: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            applications
        });

    } catch (error) {
        console.error("Get Applications Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Check required field
        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        // Check valid status
        const validStatuses = [
            "Applied",
            "Shortlisted",
            "Rejected",
            "Selected"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

       const application = await Application.findOneAndUpdate(
    {
        _id: req.params.id
    },
    {
        status
    },
    {
        new: true
    }
);
    

        // Application not found
        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        // Send updated application
        res.status(200).json({
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        console.error("Update Application Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
module.exports = {
    createApplication,
    getMyApplications,
    updateApplicationStatus
};