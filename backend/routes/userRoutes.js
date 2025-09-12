import express from "express"
import { getUser,loginUser,registerUser } from "../contollers/userController"
const userRouter=express.Router()

userRouter.post("/login",loginUser)
userRouter.post("/register",registerUser)
userRouter.post("/profile",getUser)

export default userRouter