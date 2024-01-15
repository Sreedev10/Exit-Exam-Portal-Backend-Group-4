// const Mongoose=require("mongoose")
// let studentSchema=Mongoose.Schema(

//     {
//         regid:String,
//         name:String,
//         batch:String,
//         a1:String,
//         a2:String,
//         a3:String,
//         cs1:String,
//         cs2:String,
//         Project:String,
//         Eligibilty:String
//     }
// )

// let studentModel=Mongoose.model("student",studentSchema)
// module.exports=studentModel


const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  regid: String,
  name: String,
  batch: String,
  a1: String,
  a2: String,
  a3: String,
  cs1: String,
  cs2: String,
  Project: String,
  Eligibilty: String,
});

module.exports = mongoose.model('Student', studentSchema);


