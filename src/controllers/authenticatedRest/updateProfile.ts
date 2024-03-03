import User from "../../models/userAuth";
import { Request, Response } from "express";

import { AuthenticatedRequest } from "../../interfaces";
import Community from "../../models/community";
import { io } from "../..";
export const updateProfile = async (
  re: AuthenticatedRequest,
  res: Response
) => {
  console.log(JSON.stringify(re.user));
  try {
    if (re.body?.title) {
      const community = await Community.findOneAndUpdate(
        { title: re.body.title },
        { $push: { members: re.user } },
        { new: true }
      );
      io.emit("JoinCommunity", {
        Community: community?._id,
        user: re?.user,
      });
    }
    console.log(`data: ${JSON.stringify(re.body)}, user:${re.user}`);
    const updatedUser = await User.findByIdAndUpdate(re.user, re.body, {
      new: true,
    });
    console.log(`Updated user:${updatedUser}`);
    res.status(200).send(`success`);
  } catch (e) {
    console.log(`Update error:${e}`);
    res.status(500).json(`An error occured`);
  }
};
