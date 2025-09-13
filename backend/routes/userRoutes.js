import express from "express"
import { getUser,loginUser,registerUser } from "../contollers/userController.js"
import { auth } from "../middlewares/auth.js"
const userRouter=express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/register",registerUser)
userRouter.post("/profile",auth,getUser)

export default userRouter