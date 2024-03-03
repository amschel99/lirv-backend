
import { ObjectId } from 'bson'
export  const postJobQuery = `
mutation {
  postJob(job: {
    title: "Your Job Title",
    description: "Your Job Description",
    responsibilities: "Your Job Responsibilities",
    requirements: "Your Job Requirements",
    benefits: "Your Job Benefits",
    jobType: "Your Job Type",
    deadline: "10-12-2023"  
  }) {
    _id
    title
   
  }
} console.log("The user applyinf for the job is"+user)
`;


export const applyJobQuery=`
mutation ApplyForJob($jobId: ID!, $coverLetter: String!) {
    apply(jobId: $jobId, coverLetter: $coverLetter) {
      _id  
      applicant{
        _id
        
      }
      job{
        title
      }
      coverLetter

   
      
    }
  }
  
`