import mongoose from 'mongoose'

export const JobPostingSchema= new mongoose.Schema(

{
    business:{
        type:mongoose.Schema.Types.ObjectId,

        ref:"User",
  
        required:[true, "A job posting must have an associated Business"]


    },
    description:{
        type:String,
        required:[true, "A job posting must have a description"]
    },
    title:{
        type:String,
        required:[true, "A job posting must have a title"]
    },
    responsibilities:{
        type:String
    },
    requirements:{
        type:String
    },
    benefits:{
        type:String
    },
    jobType:{
        type:String
    },
    datePosted:{
        type:String
    },
    deadline:{
        type:String
    },
    expired:{
        type:Boolean,
        default:false
    },
    applications:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Jobapplication"
   
    }

}

)
const JobPosting=mongoose.model("Jobposting",JobPostingSchema);

export default JobPosting