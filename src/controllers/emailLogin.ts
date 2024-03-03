import User from "../models/userAuth";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req: Request, res: Response) => {
  console.log("hello" + process.env.ACCESS_TOKEN_SECRET);
  const { email, password } = req.body;
  console.log(JSON.stringify(req.body));

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).send("user was not found");
    }
    console.log(userExists.password + "password been");
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      console.log(`wrong credentials`);
      return res.status(400).send("email or password was wrong");
    }

    const accessToken = jwt.sign(
      { _id: userExists._id },
      process.env.ACCESS_TOKEN_SECRET as Secret,

      {
        expiresIn: "30d",
      }
    );

    const refreshToken = jwt.sign(
      { _id: userExists._id },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      {
        expiresIn: "365d",
      }
    );

    userExists["refreshToken"] = refreshToken;
    await User.findByIdAndUpdate({ _id: userExists._id }, userExists);

    res.status(200).json({
      accessToken,
      refreshToken,
      accountType: userExists?.accountType,
      _id: userExists?._id,
      email: userExists?.email,
    });
  } catch (e: any) {
    console.log(JSON.stringify(e));
    res.json(e.message);
  }
};
