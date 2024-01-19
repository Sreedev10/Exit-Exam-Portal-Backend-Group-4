const Mongoose=require("mongoose")

let loginSchema=Mongoose.Schema(

    {
        email:String,
        password:String,
        role:String
        
    }
)

let loginModel=Mongoose.model("data",loginSchema)
module.exports=loginModel