import fs from "fs"
import path from "path"
import Resume from "../models/resume.js" 
import { error } from "console"
import upload from "../middlewares/uploadMiddleware.js"


export const uploadResume= async(req,res)=>{
     try{
         upload.fields([{name:"thumbnail"},{name:profileImage}])
         (req,res,async(err)=>{
            if(err)
            {
                return res.status(400).json({message:"File upload failed",error: err.message})
            }

            const resumeId=req.params._id
            const resume= Resume.findOne({_id: resumeId,userId:req.user._id})

            if(!resume)
            {
                res.status(401).json({message:"Rsume not found"})
            }

            //LOCATING UPLOADS FILE
            const uploadsFolder=path.join(process.cwd(), "uploads")
            const baseUri=`${req.protocol}://${req.get("host")}`

            const newThumbnail = req.files.thumbnail?.[0];
            const newProfileImage = req.files.profileImage?.[0];     
            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                    if (fs.existsSync(oldThumbnail)) {
                    fs.unlinkSync(oldThumbnail);
                    }
                }
                resume.thumbnailLink = `${baseUri}/uploads/${newThumbnail.filename}`;
            }

            if (newProfileImage) {
                if (resume.profileInfo?.previewUrl) {
                    const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.previewUrl));
                    if (fs.existsSync(oldProfile)) {
                    fs.unlinkSync(oldProfile);
                    }
                }
                resume.profileInfo.previewUrl = `${baseUri}/uploads/${newProfileImage.filename}`;
            }
             
            await resume.save()
            res.status(200).json(
                {
                    message:"Image uploaded successfully",
                    thumbnailLink:resume.thumbnailLink,
                    previewUrl:resume.previewUrl,
                }
            )
         })
     }
     catch(err){
          console.log("Error uploading images")
          res.status(500).json({
         message:"Failed to upload images",
         err:error.message})
        }
}