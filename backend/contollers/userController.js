import User from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'})
}

//REGISTER
export const registerUser=async (req,res)=>{
    try{
         const {name,email,password}=req.body
         const userexists= await User.findOne({email})
         if(userexists)
         {
            res.status(400).json({message:"User already exists"})
         }
         if(password.length<8)
         {
             res.status(400).json({message:"Password must be strong"})
         }
         const salt=bcrypt.genSalt(10)
         const hashedpassword=bcrypt(password,salt)
         const user=await User.create({
            name,
            email,
            password:hashedpassword
         })
         res.status(201).json(
            {
                id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            }
         )
        
                 
    }
    catch(error){
         res.status(500).json(
            {message:"Server Error",
             error:error.message
            })
    }
}

//LOGIN
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user= User.findOne({email})
        if(!user)
        {
            res.status(400).json({message:"User does not exist"})
        }
        if(!bcrypt.compare(password,user.password))
        {
            res.status(400).json({message:"Invalid Credentials"})
        }
        res.status(201).json(
            {
                id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            }
         )
    }
    catch(error)
    {
        res.status(500).json(
        {message:"Server Error",
         error:error.message
        })
    }
    
}

//GET USER
export const getUser=async(req,res)=>{
   try{
       const user= User.findById(req.user._id).select('-password')
       if(!user)
       {
         res.status(400).json({message:"User not found"})
       }
    res.staus(201).json({user})
   }
   catch(error)
   {
       res.status(500).json(
        {message:"Server Error",
         error:error.message
        })
   }
 }