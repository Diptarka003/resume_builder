import jwt from "jsonwebtoken"
import User from "../models/user.js"
const auth=async(req,res,next)=>
{
   const token =req.headers.Authorization.split(" ")[1]
  try{
     if(!token)
     {
      res.status(400).json({message:"Token does not exist"})
     }
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
     req.user=User.findById(decoded._id).select('-password')
     next()
  }
  catch(error){
     res.status(500).json({message:"Token failed"})
  }
   
}