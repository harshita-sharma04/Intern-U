const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const {
    createInternship,
    updateInternship,
    getAllInternships,
    getInternshipById
} = require("../controllers/internshipController");


// ==========================================
// CREATE INTERNSHIP
// ==========================================
router.post(
    "/",
    protect,
    allowRoles("recruiter", "admin"),
    createInternship
);


// ==========================================
// UPDATE INTERNSHIP
// ==========================================
router.patch(
    "/:id",
    protect,
    allowRoles("recruiter", "admin"),
    updateInternship
);


// ==========================================
// GET ALL INTERNSHIPS
// ==========================================
router.get(
    "/",
    getAllInternships
);


// ==========================================
// GET INTERNSHIP BY ID
// ==========================================
router.get(
    "/:id",
    getInternshipById
);


module.exports = router;