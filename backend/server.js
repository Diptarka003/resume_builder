import express from "express"
import 'dotenv/config'
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
const app=express()
app.use(express.json())
app.use(cors())
connectDB
app.use('api/auth',userRouter)
app.get('/',(req,res)=>{
    res.json("API Working")
})
app.listen(process.env.PORT,()=>{
    console.log(`Server running on PORT:${process.env.PORT}`)
})
