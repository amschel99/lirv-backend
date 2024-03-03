
import JobApplication from "../models/JobApplication"

export const getAppliedJobs=async  (user)=>{
    try{
        const appliedJobs = await JobApplication.find({applicant: user});

        return appliedJobs;

    }
    catch(e:any){
console.log(e?.message)
return null;
    }
}