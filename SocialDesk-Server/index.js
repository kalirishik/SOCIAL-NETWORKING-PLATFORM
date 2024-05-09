import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const port=3500;
const app=express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.listen(port,()=>console.log(`Server is Running on the port : ${port}`));
mongoose.connect("mongodb://127.0.0.1:27017/SocialApp")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Connection failed", err));
const schemaModel1=mongoose.Schema({
    username:String,
    email:String,    
    password:String,
    confirmpassword:String
},{
    timestamps:true
})
const userModel1=mongoose.model("userdatas",schemaModel1);
let name;
let emaill;
app.post("/SignUp", async (req, res) => {
    try {
      const { email} = req.body;
      const existingUser = await userModel1.findOne({ email});
      if(existingUser){
        return res.json({ success: false, message: "This Email is already in use" });
      }
      const newUser = new userModel1(req.body);
      await newUser.save();
      res.json({ success: true, message: "Signup  Successfully 👍🏻" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  });
  app.post("/SignIn", async (req, res) => {
    try {
      const { email, password } = req.body;
      if(email === "kalirishik@gmail.com" && password === "Kali@2003")
      return res.json({ success: true, message: "Welcome Admin 👨🏻‍💻" ,redirectToAdmin:true});
    else{
      const user = await userModel1.findOne({ email });
      if (!user) {
            return res.json({ success: false, message: "User not found. Please Register first." });
          }
          else{
            if (user.password === password) {
              res.json({ success: true, message: "Welcome " + user.username + " 🎉", redirectToAdmin: false, redirectToSocialPage: true });
              name=user.username;
              emaill=user.email;
              await sendDetails(user.email,user.username);
            } else {
              return res.json({ success: false, message: "Incorrect password" });
            }
          }
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred" });
      }
    });
    app.get("/server",(req,res)=>{
      res.send("Server is running");
    })
    app.get("/SocialPage",(req,res)=>{
      res.sendFile(formPath);
    })
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kaliempire7@gmail.com', // Your Gmail email address
        pass: 'jwaj srik dgge uime' // Your Gmail password
      }
    });
    async function sendDetails(email,username){
      var currentDate = new Date();
      try{
        const mailOptions={
          from:'kaliempire7@gmail.com',
          to:email,
          subject:'Login Time',
          html:`<!DOCTYPE html>
          <html lang="en">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login Time</title>
          <script>
          var currentDate = new Date();
          console.log(currentDate);
          </script>
          <style>
          div{
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color:#FFF6E9;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          }
          h1{
            background-color: aqua;;
          }
          h2{
            color:red;
          }
          </style>
          </head>
          <body>
              <center>
              <div>
              <h1>SOCIAL DESK</h1>
              <h2>Login Attempt</h2>
              <h5>UserName  : ${username}</h5>
              <h5>Date Time : ${currentDate}</h5>
              </div>
              </center>
              </body>
              </html>`
            }
            console.log(mailOptions);
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
          }
          catch(e){
            console.log(e);
    }
  }
  const schemaModel2=mongoose.Schema({
      username:String,
      email:String,
      datetime:String,    
      latitute:String,
      longitude:String,
      city:String,
      state:String,
      country:String
  },{
      timestamps:true
  })
  const userModel2=mongoose.model("userlogindetails",schemaModel2);
  app.post("/userLoginDetails", async (req, res) => {
    try {
        const {latitude, longitude, city, state, country } = req.body;
        const newUserLogin = new userModel2({
            username: name,
            email:emaill,
            datetime: new Date().toISOString(),
            latitude,
            longitude,
            city,
            state,
            country
        });
        await newUserLogin.save();
        // res.status(200).json({ success: true, message: "Login details saved successfully" });
    } catch (error) {
        console.error(error);
        // res.status(500).json({ success: false, message: "An error occurred while saving login details" });
    }
});
app.get("/userLoginDetails2",(req,res)=>{
  userModel2.find().then((user)=>res.json(user)).catch((err)=>res.json(err));
})
