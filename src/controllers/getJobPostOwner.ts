import JobPosting from "../models/JobPosting";
import User from "../models/userAuth";


export const  getJobPostOwner= async (id)=>{
    try{
const business= await JobPosting.findById(id)
if(!business){
    throw Error(`No such busness`)
}
const returnedBusiness= await User.findById(business?.business);
return returnedBusiness;
    }
    catch(e){
console.log(`an error occured while fetching a business`)
    }

}
