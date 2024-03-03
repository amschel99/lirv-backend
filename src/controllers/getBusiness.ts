import User from "../models/userAuth";
export const getBusinesses= async()=>{
    try{
  
const users= await User.find({accountType:1})
console.log(users)
return users;
    }
    catch(e:any){
console.log(e?.message)
    }
}