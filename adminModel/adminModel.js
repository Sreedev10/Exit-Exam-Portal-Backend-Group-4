const Mongoose=require("mongoose")
let adminSchema=Mongoose.Schema(

    {
       email:String,
       password:String
    }
)

let adminModel=Mongoose.model("admin",adminSchema)
module.exports=adminModel