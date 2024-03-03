
import JobApplication from "../models/JobApplication"

export const getJobApplictions=async  (id)=>{
    try{
        const applications = await JobApplication.find({job: id});

        return applications;

    }
    catch(e:any){
console.log(e?.message)
return null;
    }
}