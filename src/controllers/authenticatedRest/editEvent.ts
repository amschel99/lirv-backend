import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interfaces";
import Event from "../../models/event";
import { io } from "../..";
export const editEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      res.status(400).json(`No event Id was specified`);
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    io.emit("EditEvent", {
      eventId,
      newEvent: updatedEvent,
    });
    res.status(200).json(updatedEvent);
  } catch (e) {
    res.status(500).json(`An error occured`);
  }
};
