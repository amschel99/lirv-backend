import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces";
import Community from "../../models/community";
import { validateBody } from "../../utils";

const validatorVar = {
  image: "dummy-image-url",
  title: "Dummy Community",
  description: "This is a dummy community for testing purposes.",
  tags: "",
};

export const createCommunity = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    console.log(JSON.stringify(req?.body));
    //validateBody(validatorVar, req, res);
    const community = await Community.create(req.body);
    res.status(201).json(community);
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json(`An error occured`);
  }
};
