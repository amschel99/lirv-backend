import Job from "../models/JobPosting"
export const getJobPostings= async ()=>{

    try{
const jobs= await Job.find({});
return jobs;
    }
    catch(e:any){
console.log(e?.message);
return null;
    }
}