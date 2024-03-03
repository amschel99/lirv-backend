import User from "../models/userAuth";
export const getSingleBusiness= async(id)=>{
    try{
        console.log(id)
  
const business= await User.findById(id)
console.log(business)
return business;
    }
    catch(e:any){
console.log(e?.message)
    }
}