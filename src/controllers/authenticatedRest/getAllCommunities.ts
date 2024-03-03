import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import Community from "../../models/community";

export const getAllCommunities = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user; // Assuming req.user contains the user information as a string
    const communities = await Community.find({ members: { $in: [user] } });
    res.status(200).json(communities);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
