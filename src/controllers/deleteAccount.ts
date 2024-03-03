import User from "../models/userAuth"
export const deleteAccount= async (id)=>{


    try{
        await User.findByIdAndDelete(id);
        return "Account deleted"

    }
    catch(e){
        console.log(e);
        return null;

    }
}