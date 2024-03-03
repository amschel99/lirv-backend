import { Response } from "express";
import { AuthenticatedRequest } from '../interfaces';
import User from "../models/userAuth";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const client = twilio(process.env.ACCOUNT_SID, process.env.TWILIO_TOKEN);
const checkVerificationStatus = async (req: AuthenticatedRequest, res: Response, retries = 5) => {
  if (retries <= 0) {
    return res.status(500).send('Verification check timeout');
  }

  try {
    const verification = await client.verify
      .v2.services(process.env.VERIFY_SID as string)
      .verificationChecks.create({ to: req.body.phone, code: req.body.code });
      

    console.log(verification.status);

    if (verification.status === 'approved') {
      const updatedUser = await User.findOneAndUpdate({ _id: req.user }, { Verified: true });
return res.status(200).json(`User was verified succesfully`);
    } else if (verification.status === 'pending') {
        setTimeout(() => {
            checkVerificationStatus(req, res, retries - 1);
          }, 2000); 
     
    } else {
        return res.status(400).json('The verification status was not approved');
    
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal server error at verify.ts');
  }
};

export const verify = async (req: AuthenticatedRequest, res: Response) => {
  checkVerificationStatus(req, res);
};
