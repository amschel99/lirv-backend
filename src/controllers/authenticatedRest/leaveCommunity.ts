import { Response } from "express";
import { AuthenticatedRequest } from "../../interfaces";
import Community from "../../models/community";
import { io } from "../..";
export const leaveCommunity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { communityId } = req.params;

    await Community.findByIdAndUpdate(
      communityId,
      { $pull: { members: req.user } },
      { new: true }
    );
    io.emit("leftCommunity", { Community: communityId, user: req.user });
    res.status(200).json({ message: "Successfully left the community." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
};
