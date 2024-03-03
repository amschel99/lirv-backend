import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import CommunityPost from "../../models/communityPost";

export const getPostsInCommunity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { communityId } = req.params;
  console.log(`communityId for getPostsInCommunity: ${communityId}`);
  try {
    const posts = await CommunityPost.find({ community: communityId });
    console.log(`Posts in communicity:${posts}`);
    res.status(200).json(posts);
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json(`There was an error`);
  }
};
