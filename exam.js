const Express=require("express")
const Bodyparser=require("body-parser")
const Cors=require("cors")
const Mongoose=require("mongoose")
const examModel = require("./examModel/examModel")

var exam=Express()


exam.use(Cors())
exam.use(Bodyparser.json())
exam.use(Bodyparser.urlencoded({extended:true}))


Mongoose.connect("mongodb+srv://college:college12345@cluster0.sonwgpf.mongodb.net/examdb?retryWrites=true&w=majority", { useNewUrlParser: true});


exam.get("/",(req,res)=>{

    res.send("welcome")
})

exam.post("/add",async(req,res)=>{
    let data=new examModel(req.body)
    console.log(data)
    await data.save()



    res.send(data)
})

exam.listen(3000)