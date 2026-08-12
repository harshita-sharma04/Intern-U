const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const {
    createApplication,
    getMyApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

router.post("/", protect, createApplication);

router.get("/", protect, getMyApplications);
router.patch(
    "/:id/status",
    protect,
    allowRoles("recruiter", "admin"),
    updateApplicationStatus
);

module.exports = router;