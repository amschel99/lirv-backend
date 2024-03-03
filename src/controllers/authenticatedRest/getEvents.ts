import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces";
import Event from "../../models/event";
export const getEvents = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (e) {
    res.status(500).json(`An error occured`);
  }
};
