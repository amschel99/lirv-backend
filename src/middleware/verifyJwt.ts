import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces";
dotenv.config();
export const verifyJwt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.url.startsWith("/api/auth")) {
    return next();
  } else {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).send("unAuthorized");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret,
      (err, decoded) => {
        if (err) {
          return res.status(403).send(`${err} +forbidden`);
        }

        req.user = (decoded as JwtPayload)._id;
        console.log("working" + req.user);
        next();
      }
    );
  }
};
