import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import CommunityPost from "../../models/communityPost";

export const getPostInCommunity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { postId } = req.params;
  try {
    if (!postId) {
      return res
        .status(400)
        .json(`The id of the post should be provided in the post`);
    }
    const post = await CommunityPost.findById(postId);
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(`There was an error`);
  }
};
