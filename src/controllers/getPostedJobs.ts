
import JobPosting from "../models/JobPosting"

export const getPostedJobs=async  (id)=>{
    try{
        const postedJobs = await JobPosting.find({business: id});

        return postedJobs;

    }
    catch(e:any){
console.log(e?.message)
return null;
    }
}