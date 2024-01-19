const Express=require("express")
const Bodyparser=require("body-parser")
const Cors=require("cors")
const Mongoose=require("mongoose")
const loginModel = require("./loginModel/loginModel")

var login=Express()


login.use(Cors())
login.use(Bodyparser.json())
login.use(Bodyparser.urlencoded({extended:true}))


Mongoose.connect("mongodb+srv://college:college12345@cluster0.sonwgpf.mongodb.net/examdb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })


login.get("/",(req,res)=>{

    res.send("welcome to login page")
})

login.post("/add",async(req,res)=>{
    let data=new loginModel(req.body)
    console.log(data)
    await data.save()



    res.send(data)
})

login.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
      }
  
      // Authenticate user based on provided credentials
      const user = await loginModel.findOne({ email, password }).exec();
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  
      // Determine the role from the user object
      const role = user.role || 'admin';
  
      // Depending on the role, you can redirect or send the role back to the frontend
      let redirectPath = '/';
      switch (role) {
        case 'admin':
          redirectPath = '/admindash';
          break;
        case 'student':
          redirectPath = '/studdash';
          break;
       
        default:
          break;
      }
  
      res.status(200).json({ success: true, message: 'Login successful', redirectPath, role });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });



login.listen(3600)