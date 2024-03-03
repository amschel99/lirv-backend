import mongoose from 'mongoose'
export const linksSchema= new mongoose.Schema(

{
 github:{
    type:String
 },
 web:{
    type:String
 },
 linkedin:{
    type:String
 },
 twitter:{
    type:String
 }
}

)
const Link=mongoose.model("Link",linksSchema);
export default Link