import Resume from "../models/resume.js";
import fs from "fs"
import path from "path"

//CREATE RESUME
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        }
        const newResume= Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
            ...req.body,
        })
        res.status(201).json(newResume)
    }
    catch(error){
        res.status(500).json({message:"Failed to create Resume",error:error.message})
    }
}

//GET RESUME
export const getResume=async(req,res)=>{
   try{
       const resumes= await Resume.find({userId:req.user._id}).sort({updatedAt:-1})
       res.json({resumes})
   }
   catch(error)
   {
     res.status(500).json({message:"Failed to get resume ",error:error.message})
   }
}

//GET RESUME BY ID

export const getResumebyId=async(req,res)=>{
    try{
        const resume= await Resume.findOne({userId:req.user._id, _id:req.params.id})
        if(!resume)
        {
            res.status(401).json({message:"No resume found"})
        }
        res.staus(201).json({resume})
    }
     catch(error)
   {
     res.status(500).json({message:"Failed to get Resume",error:error.message})
   }
}

//UPDATE RESUME BY ID


export const updateResume=async(req,res)=>{
    try{
        const resume= await Resume.findOne({userId:req.user._id, _id:req.params.id})
        if(!resume)
        {
            res.status(401).json({message:"No resume found"})
        }
        Object.assign(resume,req.body)
        const savedResume= await resume.save()

    }
    catch(error){
       res.status(500).json({message:"Failed to get Resume",error:error.message})
    }
}
 
//DELETE RESUME

export const deleteResume=async(req,res)=>{
    try{
        const resume= await Resume.findOne({userId:req.user._id, _id:req.params.id})
        if(!resume)
        {
            res.staus(401).json({message:"Resume not found"})
        }
        const uploadsFolder=path.join(process.cwd(),'uploads')
        if(resume.thumbnailLink)
        {
            if (resume.thumbnailLink) {
               const oldThumbnail = path.join(uploadsFolder,path.basename(resume.thumbnailLink));
                if(fs.existsSync(oldThumbnail))
                {
                  fs.unlinkSync(oldThumbnail);
                }
            }
        }
        if(resume.profileInfo?.previewUrl)
        {
            const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.previewUrl))
            if(fs.existsSync(oldProfile))
            {
                fs.unlinkSync(oldProfile);
            }
        }
        const deleted= await Resume.findOneAndDelete({userId:req.user._id, _id:req.params.id})
        if(!deleted)
        {
            res.staus(401).json({message:"Resume not found"})
        }
        res.status(201).json({message:"Resume deleted successfully"})

    }
    catch(error)
    {
        res.status(500).json({message:"Failed to get Resume",error:error.message})
    }
}