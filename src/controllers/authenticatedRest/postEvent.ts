import { Request, Response } from "express";
import Event from "../../models/event";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../../interfaces";
import { validateBody } from "../../utils";
import { io } from "../..";

let eventType = {
  photo: "",
  date: "",
  title: "",
  description: "",
  type: "",
};

export const postEvent = async (req: AuthenticatedRequest, res: Response) => {
  console.log(JSON.stringify(req.body));
  try {
    const user = req?.user;

    // validateBody(eventType, req, res);

    // Create the event
    const event = await Event.create({ postedBy: user, ...req.body });
    console.log(`The new event is :${event?._id}`);
    io.emit("newEvent", { event });
    res.status(201).json(event);
  } catch (e) {
    console.error(`Error creating event: ${e}`);
    res.status(500).json({ error: "An error occurred" });
  }
};
