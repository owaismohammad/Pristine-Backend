const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt= require('jsonwebtoken');
const multer=require('multer')
const bcrypt=require('bcryptjs')
require('dotenv').config();
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const mongoUrl = process.env.MONGO_URL;


const JWT_SECRET=process.env.JWT_SECRET;

// MongoDB Connection
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Connection error:", e);
  });

// User model (ensure you have UserDetails.js with the correct schema)
require('./UserDetails');
const User = mongoose.model("UserInfo");

// Default route
app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

// Register route
app.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    // Check if user already exists
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.send({ status: "error", data: "User already exists" });
    }
    const encryptedPassword=await bcrypt.hash(password,10)
    // Create new user
    await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      mobile: mobile
    });

    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});


app.post("/login-user", async(req,res)=>{
    const {email, password}=req.body;
    const oldUser=await User.findOne({email:email});
    
    if(!oldUser){
        return res.send({data:"User does'nt exist"})
    }
    if (await bcrypt.compare(password, oldUser.password)){
        const token=jwt.sign({email: oldUser.email}, JWT_SECRET)
        if(res.status(201)){
            return res.send({status:"ok", data: token})
        }else
        return res.send({error:"error "})
    }
})

// const upload = multer({ dest: 'uploads/' });

// app.post('/check-purity', upload.single('image'), (req, res) => {
//   // req.file contains the uploaded file
//   // Perform purity check logic here (e.g., run a machine learning model)
//   const result = performPurityCheck(req.file.path);

//   res.json({
//     success: true,
//     purity: result,
//   });
// });

// function performPurityCheck(imagePath) {
//   // Your logic to check purity goes here
//   return 'Pure'; // or 'Impure' based on your logic
// }

app.post("/userdata", async(req,res)=>{
  const {token}=req.body
  try{
    const user = jwt.verify(token, JWT_SECRET)
    const userEmail= user.email;
    User.findOne({email:userEmail}).then((data)=>{
    return res.send({status:"ok", data: data})
    })  }catch(error){
      return res.send({error: error})
    }
})

// Start server
app.listen(5001, () => {
  console.log('Node.js server started on port 5001');
});
