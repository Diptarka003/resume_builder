import express from "express"
import 'dotenv/config'
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import resumeRouter from "./routes/resumeRoutes.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express()
app.use(express.json())
app.use(cors())
connectDB
app.use('api/auth',userRouter)
app.use('/api/resume', resumeRouter)

app.use('/uploads',express.static(
    path.join(__dirname, 'uploads'),
    {
      setHeaders: (res, _path) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
      }
    }
  )
)

app.get('/',(req,res)=>{
    res.json("API Working")
})
app.listen(process.env.PORT,()=>{
    console.log(`Server running on PORT:${process.env.PORT}`)
})
