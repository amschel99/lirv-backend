import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces";
import Event from "../../models/event";
export const getEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      res.status(400).json(`No event Id was specified`);
    }
    const event = await Event.findById(eventId);

    res.status(200).json(event);
  } catch (e) {
    res.status(500).json(`An error occured`);
  }
};
