import jwt, {JwtPayload, Secret} from 'jsonwebtoken'
import User from "../models/userAuth"
import dotenv from 'dotenv'
import { AuthenticatedRequest } from '../interfaces'
import { Response } from 'express'
dotenv.config()
export const handleRefreshToken=  async (req:AuthenticatedRequest, res:Response)=>{
try{
 const {refresh}=req.body;
   const userExists= await User.findOne({refreshToken:refresh})
console.log(userExists)
   if(!userExists){
       return res.status(403).send('forbidden')
   }

   jwt.verify(refresh,process.env.REFRESH_TOKEN_SECRET as Secret,(err:any, decoded:any)=>{
      const decodedId=(decoded as JwtPayload)._id
if(userExists._id!=decodedId){

   return res.status(403).json(`anauthorized access ${err}`)
}

const accessToken= jwt.sign({"_id":decoded._id}, process.env.ACCESS_TOKEN_SECRET as Secret, {expiresIn:'30m'})
console.log("hello" +accessToken)
res.json({accessToken, refreshToken:refresh})
   })

  }

   catch(error){
       res.status(500).send("there was an error")
   }



}