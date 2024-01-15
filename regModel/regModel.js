const Mongoose=require("mongoose")

let regSchema=Mongoose.Schema(

    {
        Name:String,
        Emailaddress:String,
        batch:String,
        gender:String,
        Mobilenumber:String
        
    }
)

let regModel=Mongoose.model("reg",regSchema)
module.exports=regModel