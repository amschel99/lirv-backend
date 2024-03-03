import { Response } from "express";
import { AuthenticatedRequest } from "../interfaces";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const client = twilio(process.env.ACCOUNT_SID, process.env.TWILIO_TOKEN);
export const sendVerification = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  console.log(req.body);
  try {
    client.verify.v2
      .services(process.env.VERIFY_SID as string)
      .verifications.create({ to: req.body.phone, channel: "sms" })
      .then((verification) => {
        console.log(verification.status);
        res.status(200).send(`The Code was sent to ${req.body.phone}`);
      })
      .catch((e) => {
        console.log(e?.message + "twilio error");
        res.status(500).send(`Twilio could not send the verification code`);
      });
  } catch (e: any) {
    console.log("server error" + e?.message);
    res.status(500).send(e.message);
  }
};
