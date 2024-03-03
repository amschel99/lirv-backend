import JobApplication from "../models/JobApplication"
import JobPosting from "../models/JobPosting"

export const newJobApplication= async(job, coverLetter, user)=>{
   console.log(`Here is the data that the user sent
   
   'Job':${job},
   'coverLetter':${coverLetter},
   'user':${user}
   `)
    try{
        const update = {
        $push: { applications: user },
      };

const appliedJob= await JobApplication.create({
    job,
applicant:user,
coverLetter,

})
console.log(`the user applied to :${JSON.stringify(appliedJob)}`)
await JobPosting.findByIdAndUpdate(job,update,{new:true})
return appliedJob;
    }
    catch(e){

        console.log(job +"thats the job");
        return null;

    }

}