import mongoose from "mongoose";
import { EducationSchema as Education } from "./education";
import { JobSchema as Job } from "./job";
import { CertificationSchema as Certification } from "./certification";
import { linksSchema } from "./links";
export const userAuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "an email must be provided"],
  },
  password: {
    type: String,
    required: [true, "a password must be provided"],
  },
  refreshToken: {
    type: String,
  },
  pushToken: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },

  Verified: {
    type: Boolean,
    default: false,
  },
  accountType: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },

  proficiencies: {
    type: [String],
  },
  title: {
    type: String,
  },
  links: linksSchema,
  profileImage: {
    type: String,
  },
  story: {
    type: String,
  },
  previousJobs: {
    type: [Job],
  },
  previousAcademics: {
    type: [Education],
  },
  phone: {
    type: String,
  },
  trustBadge: {
    type: Boolean,
    default: false,
  },
  certifications: {
    type: [Certification],
  },
  resume: {
    type: String,
  },
  businessName: {
    type: String,
  },
  industry: {
    type: String,
  },
  businessDescription: {
    type: String,
  },
  businessLocation: {
    type: String,
  },
  businessSize: {
    type: String,
  },
  businessType: {
    type: String,
  },
});
const User = mongoose.model("User", userAuthSchema);
export default User;
