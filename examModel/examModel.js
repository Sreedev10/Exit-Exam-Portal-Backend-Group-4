const Mongoose=require("mongoose")
let examSchema=Mongoose.Schema(

    {
        regid:String,
        batch:String
    }
)

let examModel=Mongoose.model("exams",examSchema)
module.exports=examModel