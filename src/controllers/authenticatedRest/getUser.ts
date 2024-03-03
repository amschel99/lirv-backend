import { AuthenticatedRequest } from "../../interfaces";
import { Response } from "express";
import User from "../../models/userAuth";

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req?.params;
    console.log(userId);
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(`There was an error`);
  }
};
