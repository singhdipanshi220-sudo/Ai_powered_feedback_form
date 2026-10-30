const Feedback = require("./models/Feedback");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });

app.post("/feedback", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();

        res.status(201).json({
            message: "Feedback saved successfully",
            feedback: feedback
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to save feedback",
            error: error.message
        });
    }
});

app.get("/feedback", async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.json(feedback);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get feedback",
            error: error.message
        });
    }
});


app.get("/", (req, res) => {
    res.send("Feedback server is running");
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});