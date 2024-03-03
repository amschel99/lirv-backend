import mongoose from 'mongoose'


export const JobApplicationSchema= new mongoose.Schema(

{
  applicant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    
  },
  coverLetter:{
    type:String
  },
  job:{
type:mongoose.Schema.Types.ObjectId,
ref:"Jobposting"

  }
}

)
const JobApplication=mongoose.model("Jobapplication",JobApplicationSchema);
export default JobApplication