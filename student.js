const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const studentModel = require("./studentModel/studentModel");

const student = express();
student.use(bodyParser.json());
student.use(bodyParser.urlencoded({ extended: true }));
student.use(cors());

mongoose.connect("mongodb+srv://college:college12345@cluster0.sonwgpf.mongodb.net/examdb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error', err);
});

student.get("/", (req, res) => {
  res.send("Welcome to the exam app");
});

student.get("/list", async (req, res) => {
  let data = await studentModel.find();
  res.send(data);
});

student.post("/addstudent", async (req, res) => {
  let data = new studentModel(req.body);
  console.log(data);
  await data.save();
  res.send(data);
});

student.post("/login", async (req, res) => {
  const { regid } = req.body;

  try {
    console.log("Received regid:", regid);

    const student = await studentModel.findOne({ regid });

    console.log("Found student:", student);

    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.Eligibilty === '1') {
      console.log("Allowing exit exam for eligible student");
      return res.status(200).json({ allowExit: true });
    } else {
      console.log("Student not eligible.", student.Eligibilty);
      return res.status(403).json({ allowExit: false });
    }
    
  } catch (error) {
    console.error('Error in /login route:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3400;
student.listen(PORT, () => {
  console.log("Server is running on port 3400");
});
