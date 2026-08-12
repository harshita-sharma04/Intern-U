require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const internshipRoutes = require("./routes/internshipRoutes");

const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/internships", internshipRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Intern-U Backend is Running!");
});

// Start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error.message);
    }
};

startServer();