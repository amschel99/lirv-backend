
import JobPosting from "../models/JobPosting"
export const PostJob= async(job,user)=>{

    try{

        console.log(job)
const postedJob= await JobPosting.create({
    ...job,
    business:user,
 

})
return postedJob;

    }
    catch(e){
        console.log("controller has error" +JSON.stringify(e) )

    }
}