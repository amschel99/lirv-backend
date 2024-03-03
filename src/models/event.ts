import mongoose from "mongoose";
import { userAuthSchema as User } from "./userAuth";
export const EventSchema = new mongoose.Schema({
  photo: {
    type: String
   
  },
  date: {
    type: String,
    required: [true, "Add a date to your event"],
  },
  title: {
    type: String,
    required: [true, "Add a title to your event"],
  },
  description: {
    type: String,
    required: [true, "Add a description your event"],
  },
  type: {
    type: String,
    enum: ["Online", "Physical"],
    required: [true, "Describe the event type"],
  },
  attending: {
    type: [mongoose.Schema.Types.ObjectId],

    ref: "User",

    required: [true, "An event  posting must have an associated User"],
  },
  link: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: [true, "An event  posting must have an associated User"],
  },
});
const Event = mongoose.model("Event", EventSchema);
export default Event;
