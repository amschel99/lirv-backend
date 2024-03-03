import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import Community from "../../models/community";
import CommunityPost from "../../models/communityPost";
import { io } from "../..";
export const deletePostInCommunity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { communityId } = req.params;
  const { postId } = req.body;
  try {
    if (!communityId || !postId) {
      return res
        .status(400)
        .json(`Invalid input. Both communityId and postId are required.`);
    }
    await CommunityPost.findByIdAndDelete(postId);
    await Community.findByIdAndUpdate(
      communityId,
      { $pull: { posts: postId } },
      {
        new: true,
      }
    );
    io.emit("deletePost", {
      Community: communityId,
      post: postId,
    });
    res.status(201).json(`Post deleted`);
  } catch (e) {
    res.status(500).json(`There was an error`);
  }
};
