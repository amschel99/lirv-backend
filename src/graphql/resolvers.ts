import { getUsers } from "../controllers/getUsers";
import { getUser } from "../controllers/getUser";
import { getBusinesses } from "../controllers/getBusiness";
import { getSingleBusiness } from "../controllers/getSingleBusiness";
import { EmailAdress, Date, Account } from "./customScalars";
import { getJobPostings } from "../controllers/getJobPostings";
import { getSingleJobPosting } from "../controllers/getSingleJobPosting";
import { getAppliedJobs } from "../controllers/getAppliedJobs";
import { getJobApplictions } from "../controllers/getJobApplications";
import { getPostedJobs } from "../controllers/getPostedJobs";
import { PostJob as postJobController } from "../controllers/postJob";
import { newJobApplication } from "../controllers/applyJob";
import { deleteJob as deletePostedJob } from "../controllers/deleteJob";
import { getJobPostOwner } from "../controllers/getJobPostOwner";
import { updateProfile as updateProfileController } from "../controllers/updateProfile";
import { deleteAccount as deleteAccountController } from "../controllers/deleteAccount";
export const resolvers = {
  Query: {
    users() {
      return getUsers();
    },

    user(parent, args, context) {
      return getUser(args.email);
    },
    businesses() {
      return getBusinesses();
    },
    business(parent, args, context) {
      return getSingleBusiness(args._id);
    },
    jobPostings(parent, args, context) {
      return getJobPostings();
    },
    jobPosting(parent, args, context) {
      return getSingleJobPosting(args?._id);
    },
  },
  User: {
    appliedJobs(parent) {
      return getAppliedJobs(parent?._id);
    },
  },
  JobPosting: {
    applications(parent) {
      return getJobApplictions(parent?._id);
    },
    business(parent) {
      return getJobPostOwner(parent?._id);
      //find a business which has this job posting
    },
  },
  Business: {
    postedJobs(parent) {
      return getPostedJobs(parent?._id);
    },
  },

  Mutation: {
    postJob(parent, args, context) {
      console.log(`the context ${context?.user}`);

      return postJobController(args?.job, context?.user);
    },
    deleteJob(parent, args, context) {
      return deletePostedJob(args?.jobId, context?.user);
    },
    apply(parent, args, context) {
      console.log("the details are" + JSON.stringify(args));
      return newJobApplication(args?.jobId, args?.coverLetter, context?.user);
    },
    updateProfile(parent, args, context) {
      return updateProfileController(args?.profileDetails, context?.user);
    },
    deleteAccount(parent, args, context) {
      return deleteAccountController(context?.user);
    },
  },

  EmailAdress: EmailAdress,
  Date: Date,
  Account: Account,
};
