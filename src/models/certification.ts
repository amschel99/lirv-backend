import mongoose from 'mongoose'
export const CertificationSchema= new mongoose.Schema(

{
  file:{
    type:String,
    required:[true, "A certification file must be provided"]
  },
  institution:{
    type:String,
    required:[true, "A valid institution must be provided"]
  },
  title:{
    type:String,
    required:[true, "A certification must have a title"]
  },
  date:{
    type:String,
    required:[true, "A date must be provided"]
  }

}

)
const Certification=mongoose.model("Certification",CertificationSchema);
export default Certification;