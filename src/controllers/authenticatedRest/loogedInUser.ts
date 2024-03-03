import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import User from "../../models/userAuth";

export const getLoggedInUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req?.user);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(`There was an error`);
  }
};
