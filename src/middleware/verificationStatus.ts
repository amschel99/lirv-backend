import UserModel from "../models/userAuth"
import {Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../interfaces"
export const verificationStatus= async (req:AuthenticatedRequest, res:Response,next:NextFunction)=>{
    try{
const user= await UserModel.findById(req.user);

if(user?.Verified===false){
    return res.status(400).json(`Please verify your phone number first`)
}
req.verified=true;
next();

    }
    catch(e){
res.status(500).json({message:`Internal Server error`,module:`Verification status`})
    }
}
