const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Mongoose = require("mongoose");
const adminModel = require("./adminModel/adminModel");

var admin = express();

admin.use(cors());
admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({ extended: true }));

Mongoose.connect("mongodb+srv://college:college12345@cluster0.sonwgpf.mongodb.net/examdb?retryWrites=true&w=majority", { useNewUrlParser: true});

admin.get("/", (req, res) => {
    res.send("Welcome to admin login");
});

admin.post("/exitadmin", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await adminModel.findOne({ email, password });

        if (user) {
            res.json({ success: true, message: "Login successful", userData: user });
        } else {
            res.json({ success: false, message: "Login failed. User not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 3300;
admin.listen(PORT, () => {
  console.log("Server is running on port 3300");
});