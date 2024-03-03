
import UserAuth from "../models/userAuth"
import { Request,Response } from "express"
import bcrypt from 'bcryptjs'
export const registerUserAuth= async (req:Request,res:Response)=>{
    const {email, password}=req.body
 console.log(JSON.stringify(req.body) +"data from frontend")
 
    try{
  
        const hashedPassword = await bcrypt.hash(password, 10);
  

    const UserAuthExists= await UserAuth.findOne({email})
  
    if(UserAuthExists!==null){
        
        return res.status(409).send("That User already exists" )
    }
console.log(`the hashed password is ${hashedPassword}`)


       const user= await UserAuth.create({
       ...req.body,  email, password:hashedPassword,
       })
res.status(201).json("Sign Up was succesful")


    }
    catch(e:any){
res.json(e.message)
    }
}