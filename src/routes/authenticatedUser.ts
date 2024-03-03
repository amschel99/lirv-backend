import express from "express";
import { updateProfile } from "../controllers/authenticatedRest/updateProfile";
import { postEvent } from "../controllers/authenticatedRest/postEvent";
import { getEvents } from "../controllers/authenticatedRest/getEvents";
import { getEvent } from "../controllers/authenticatedRest/getEvent";
import { deleteEvent } from "../controllers/authenticatedRest/deleteEvent";
import { editEvent } from "../controllers/authenticatedRest/editEvent";
import { createCommunity } from "../controllers/authenticatedRest/createCommunity";
import { joinCommunity } from "../controllers/authenticatedRest/joinCommunity";
import { leaveCommunity } from "../controllers/authenticatedRest/leaveCommunity";
import { attendEvent } from "../controllers/authenticatedRest/attend";
import { createPostInCommunity } from "../controllers/authenticatedRest/postInCommunity";
import { getPostsInCommunity } from "../controllers/authenticatedRest/getPostsInCommunity";
import { getPostInCommunity } from "../controllers/authenticatedRest/getPostInCommunity";
import { deletePostInCommunity } from "../controllers/authenticatedRest/deletePostInCommunity";
import { getAllCommunities } from "../controllers/authenticatedRest/getAllCommunities";
import { getSingleCommunity } from "../controllers/authenticatedRest/getSingleComminity";
import { getUser } from "../controllers/authenticatedRest/getUser";
import { getLoggedInUser } from "../controllers/authenticatedRest/loogedInUser";
export const AuthenticatedRouter = express.Router();

AuthenticatedRouter.route("/updateProfile").patch(updateProfile);
AuthenticatedRouter.route("/event").post(postEvent);
AuthenticatedRouter.route("/events").get(getEvents);
AuthenticatedRouter.route("/event/:eventId")
  .get(getEvent)
  .delete(deleteEvent)
  .patch(editEvent);
AuthenticatedRouter.route("/event/:eventId/attend").patch(attendEvent);
AuthenticatedRouter.route("/community").post(createCommunity);
AuthenticatedRouter.route("/community/:communityId")
  .patch(joinCommunity)
  .delete(leaveCommunity)
  .get(getSingleCommunity);
AuthenticatedRouter.route("/community/:communityId/post").post(
  createPostInCommunity
);
AuthenticatedRouter.route("/community/:communityId/delete").delete(
  deletePostInCommunity
);
AuthenticatedRouter.route("/community/:communityId/posts").get(
  getPostsInCommunity
);
AuthenticatedRouter.route("/singleUser/:userId").get(getUser);
AuthenticatedRouter.route("/loggedInUser").get(getLoggedInUser);
AuthenticatedRouter.route("/community/post/:postId").get(getPostInCommunity);
AuthenticatedRouter.route("/communities").get(getAllCommunities);
