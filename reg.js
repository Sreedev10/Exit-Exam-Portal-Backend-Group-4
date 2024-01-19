const Express = require("express");
const Bodyparser = require("body-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");
const regModel = require("./regModel/regModel");

var reg = Express();

reg.use(Cors());
reg.use(Bodyparser.json());
reg.use(Bodyparser.urlencoded({ extended: true }));

Mongoose.connect("mongodb+srv://college:college12345@cluster0.sonwgpf.mongodb.net/examdb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

reg.get("/", (req, res) => {
  res.send("welcome");
});

reg.post("/add", async (req, res) => {
  try {
    const { Name, Emailaddress, Mobilenumber, batch, gender } = req.body;

    // Check if required fields are provided
    if (!Name || !Emailaddress || !Mobilenumber || !batch || !gender) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if the email is a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Emailaddress)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    // Check if the mobile number is a valid 10-digit number
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(Mobilenumber)) {
      return res.status(400).json({ success: false, message: 'Invalid mobile number' });
    }

    // Check if the email is already registered
    const data = await regModel.findOne({ Emailaddress });

    if (data) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Continue with the registration process if the email is not registered
    const newdata = new regModel({ Name, Emailaddress, Mobilenumber, batch, gender });
    await newdata.save();

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// reg.get("/view", async (req, res) => {
//   try {
//     let data = await regModel.find();
//     res.send(data);
//   } catch (error) {
//     console.error('View error:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });
reg.get("/view", async (req, res) => {
  let data = await regModel.find();
  res.send(data);
});

reg.listen(3200, () => {
  console.log('Server is running on port 3200');
});