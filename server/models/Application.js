const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        internshipTitle: {
            type: String,
            required: true
        },

        companyName: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Applied", "Shortlisted", "Rejected", "Selected"],
            default: "Applied"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Application", applicationSchema);