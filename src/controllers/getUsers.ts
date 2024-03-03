import User from "../models/userAuth";
export const getUsers= async()=>{
    try{
const users= await User.find({})
return users;
    }
    catch(e:any){
console.log(e?.message)
    }
}