import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import Community from "../../models/community";
import CommunityPost from "../../models/communityPost";
import { io } from "../..";
export const createPostInCommunity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { communityId } = req.params;
  console.log(`The community ID is:${communityId}`);
  try {
    const post = await CommunityPost.create({
      postedBy: req.user,
      ...req.body,
    });

    await Community.findByIdAndUpdate(
      communityId,
      { $push: { posts: post._id } },
      {
        new: true,
      }
    );
    io.emit("newPost", { post, community: communityId });
    console.log(`The post is ${post}`);
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json(`There was an error`);
  }
};
