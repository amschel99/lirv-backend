import mongoose from 'mongoose'
export const JobSchema= new mongoose.Schema(

{
  type:{
    type:String,
    required:[true, "Level must be provided"]
  },
 position:{
    type:String,
    required:[true, "Program Title Must be provided"]
  },
  company:{
    type:String,
    required:[true, "Company must be provided"]
  },
  start:{
    type:String,
    required:[true, "Start Date Must be Provided"]
  },
   end:{
    type:String
   },
currentlyWorkingHere:{
    type: Boolean,
    default:true
}
}

)
const Job=mongoose.model("Job",JobSchema);
export default Job