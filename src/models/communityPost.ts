import mongoose from "mongoose";

export const CommunityPostSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: [true, "A post must have an associated user"],
  },
  postTitle: {
    type: String,
  },
  postImage: {
    type: String,
  },
  postContent: {
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Community",
  },
});
const CommunityPost = mongoose.model("CommunityPost", CommunityPostSchema);
export default CommunityPost;
