import { Response } from "express";
import { AuthenticatedRequest } from "../../interfaces";
import Event from "../../models/event";
import { io } from "../..";

export const attendEvent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    console.log();
    await Event.findByIdAndUpdate(
      eventId,
      { $push: { attending: req.user } },
      { new: true }
    );

    io.emit("Attending", {
      user: req.user,
      eventId,
    });
    res.status(200).json({ message: "You are attending...." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred" });
  }
};
