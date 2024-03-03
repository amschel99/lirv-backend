import { AuthenticatedRequest } from "../../../interfaces";
import { Response } from "express";
import Community from "../../../models/community";
import { firebase } from "../../../firebase";
import User from "../../../models/userAuth";

export const NewPost = async (req: AuthenticatedRequest, res: Response) => {
  const payload = {
    notification: {
      title: "New Post!",
      body: "There are new posts",
      content_available: "true",
      image: "https://i.ytimg.com/vi/iosNuIdQoy8/maxresdefault.jpg",
    },
  };
  const options = {
    priority: "high",
  };
  const { communityId } = req.params;

  const communities = await Community.findById(communityId);

  communities?.members.map(async (member) => {
    //for each find the user
    const user = await User.findById(member);
    firebase
      .messaging()
      .sendToDevice(user?.pushToken as string, payload, options)
      .then(function (response) {
        res.send("message succesfully sent !");
      })
      .catch(function (error) {
        res.send(error).status(500);
      });
  });
};
