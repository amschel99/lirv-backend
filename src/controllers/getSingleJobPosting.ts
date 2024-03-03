import Job from "../models/JobPosting"

export const getSingleJobPosting= async (id)=>{
    try{
const job= await Job.findById(id);
return job;
    }
    catch(e:any){
        console.log(e)
return null;


    }
}