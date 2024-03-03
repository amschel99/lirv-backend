import mongoose, { ConnectOptions } from 'mongoose'

let mongod=null

export const connectDb= async  (url:string)=>{
    if (process.env.NODE_ENV === 'test') {
       return null;
      }
    
return mongoose.connect(url, {
useNewUrlParser:true,
useUnifiedTopology: true

} as ConnectOptions)
    
   
}
export const disconnectDB = async () => {
    try {
      await mongoose.connection.close();
  
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };
  