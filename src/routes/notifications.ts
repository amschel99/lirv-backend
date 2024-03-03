import { postToAll } from "../controllers/authenticatedRest/Notifications/PostToAll";

import express from "express";
export const NotificationRouter = express.Router();
NotificationRouter.route("/newPost").post(postToAll);
