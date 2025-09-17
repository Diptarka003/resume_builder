import express from "express"
import auth from "../middlewares/auth.js"
import { createResume, deleteResume, getResume, getResumebyId, updateResume } from "../controllers/resumeController"
import { uploadResume } from "../controllers/uploadImages.js"
const resumeRouter=express.Router()

resumeRouter.post('/',auth,createResume)
resumeRouter.get('/',auth,getResume)
resumeRouter.get('/:id',auth,getResumebyId)

resumeRouter.put('/:id',auth,updateResume)
resumeRouter.put('/:id/upload-images',auth,uploadResume)
resumeRouter.put('/:id',auth,deleteResume)

export default resumeRouter