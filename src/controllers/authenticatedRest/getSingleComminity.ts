import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import Community from "../../models/community";
export const getSingleCommunity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { communityId } = req?.params;
    const community = await Community.findById(communityId);
    res.status(200).json(community);
  } catch (e) {
    res.status(500).json(JSON.stringify(e));
  }
};
