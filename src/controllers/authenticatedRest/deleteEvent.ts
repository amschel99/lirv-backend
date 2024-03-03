import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces";
import Event from "../../models/event";
export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      res.status(400).json(`No event Id was specified`);
    }
    const event = await Event.findByIdAndDelete(eventId);

    res.status(201).json(`The event was deleted`);
  } catch (e) {
    res.status(500).json(`An error occured`);
  }
};
