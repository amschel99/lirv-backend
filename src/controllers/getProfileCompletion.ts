import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import User from "../models/userAuth"

export const calculateProfileCompletion = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user; 

  try {
   
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let completionPercentage = 20; 

    

    if (user.links && Object.values(user.links).some(Boolean)) {
      completionPercentage += 20;
    }

    if (user.Verified) {
      completionPercentage += 10;
    }

    if (user.proficiencies && user.proficiencies.length > 0) {
      completionPercentage += 10;
    }

   
    if (user.profileImage && user.story && user.previousJobs && user.previousJobs.length > 0) {
      completionPercentage += 10;
    }

    if (user.previousAcademics && user.previousAcademics.length > 0) {
      completionPercentage += 10;
    }

   

    if (user.trustBadge) {
      completionPercentage += 10;
    }

    if (user.certifications && user.certifications.length > 0) {
      completionPercentage += 10;
    }

 

    if (user.resume) {
      completionPercentage += 10;
    }

   
    completionPercentage = Math.min(completionPercentage, 100);


    return res.status(200).json({ completionPercentage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


