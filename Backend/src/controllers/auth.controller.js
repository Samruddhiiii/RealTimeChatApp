import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("📥 Incoming signup data:", { fullName, email, password });

  try {
    if (!fullName || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      console.log("❌ Password too short");
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔐 Password hashed");

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("✅ User saved to DB");

    generateToken(newUser._id, res);
    console.log("✅ Token generated");

    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (err) {
    console.error("Signup error:", err);  // ✅ log actual error
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body
  try {
    const user =  await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"Invalid Credentials"})
    }

    const isPasswordCorrect =  await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials"});
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id:user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })
  } 
  catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error "})
    
  }
};

export const logout = (req, res) => {
  try{
    res.cookie("jwt","", {maxAge:0})
    res.status(200).json({ message: "Logged out successfully" });
  }
  catch(error){
    console.log("Error in logout controller", error.message);
  }
};

export const updateProfile = async(req,res) => {
  try{
    const {profilePic} =  req.body;
    const userId = req.user._id;
    if(!profilePic){
      return res.status(400).json({ message: "profilepic is required"});
    }
    
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})

    res.status(200).json(updateUser)
  }
  catch(error){
      console.log("error in update profile:", error);
      res.status(500).json({ message:"Internla server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};