

export const typeDefs= `#graphql
scalar Date
scalar EmailAdress
scalar Account
type Job{
    _id:ID!
    type:String
    position:String
    company:String
    start:Date
    end:Date
    currentlyWorkingHere:Boolean

}
type Link{

    github:String,
    web:String,
    linkedin:String,
    twitter:String

}
type Education{
    _id:ID
    level:String
    title:String
    start:Date
    end:Date
    currentlyHere:Boolean
    institution:String

}
type Certification{
    _id:ID!
    file:String!
    institution:String!
    title:String!
    date:Date!
}
type User{
    _id:ID!
    email:EmailAdress!
    links:Link
    Verified:Boolean
    proficiencies:[String!]
    accountType:Account

  
    profileImage:String
    story:String
    previousJobs:[Job]
    previousAcademics:[Education]
    phone:String
    trustBadge:Boolean
    certifications:[Certification] 
    appliedJobs:[JobApplication]
    password:String,
    resume:String
    username:String

}
type Business{
    _id:ID
    businessName:String
    industry:String
    businessDescription:String
    businessLocation:String
    businessSize:String
    businessType:String
    links:Link
    email:String
    trustBadge:Boolean
    accountType:Account
    postedJobs:[JobPosting]
    profileImage:String
    

}
type JobApplication{
    _id:ID
    applicant:User
    coverLetter:String
    job:JobPosting


}
type JobPosting{
    _id:ID
    business:Business
    title:String
    description:String
    responsibilities:String
    requirements:String
    benefits:String
    jobType:String
    deadline:Date
    datePosted:Date
 
    expired:Boolean
    applications:[JobApplication]
}


type Query{
    users:[User]
    user(email:EmailAdress!):User
    businesses:[Business]
    business(_id:ID!):Business
    jobPostings:[JobPosting]
    jobPosting(_id:ID):JobPosting
   
}

type Mutation {
  postJob(job: PostJobInput!): JobPosting
  deleteJob(jobId: ID!): [JobPosting]
  apply(jobId: ID!, coverLetter: String!): JobApplication
  updateProfile(profileDetails: UpdateProfileInput!): User
  deleteAccount(email: String!): String
}

input PostJobInput {

  title: String!
  description: String!
  responsibilities: String!
  requirements: String!
  benefits: String
  jobType: String!
  deadline: Date! 

}
input UpdateProfileInput {
  links:LinkInput
  proficiencies: [String!]
  
  profileImage: String
  story: String
  certifications: [UpdateCertifications!],
  resume:String,
  previousJobs:[JobInput]
  previousAcademics:[EducationInput]

}
input JobInput{ 
    type:String
    position:String
    company:String
    start:Date
    end:Date
    currentlyWorkingHere:Boolean
    


}

input EducationInput{
    level:String
    title:String
    start:Date
    end:Date
    currentlyHere:Boolean
    institution:String
 

}
input LinkInput{
    github:String,
    linkedin:String,
    web:String,
    twitter:String

}
input UpdateCertifications{
    file:String!
    institution:String!
    title:String!
    date:Date!  ,
 
}


`
