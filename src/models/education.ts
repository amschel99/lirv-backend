import mongoose from 'mongoose'
export const EducationSchema= new mongoose.Schema(

{
  level:{
    type:String,
    required:[true, "Level must be provided"]
  },
  title:{
    type:String,
    required:[true, "Program Title Must be provided"]
  },
  start:{
    type:String,
    required:[true, "Start Date Must be Provided"]
  },
   end:{
    type:String
   },
currentlyHere:{
    type: Boolean,
    default:true
},
institution:{
  type:String,
  required:[true, "Must specify an institution"]
}

}

)
const Education=mongoose.model("Education",EducationSchema);
export default Education