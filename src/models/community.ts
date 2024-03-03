import mongoose from "mongoose";
import { userAuthSchema as User } from "./userAuth";
import { CommunityPostSchema } from "./communityPost";

export const CommunitySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],

    ref: "User",
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "CommunityPost",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, "Creation date is required"],
  },
  tags: {
    type: [String],
  },
});

CommunitySchema.index({ title: "text", description: "text" });

const Community = mongoose.model("Community", CommunitySchema);
export default Community;
