import mongoose, {ConnectOptions} from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
async function deleteAllCollections(mongoUri: string): Promise<void> {
  try {

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

    // Get the list of collection names
    const collections = await mongoose.connection.db.listCollections().toArray();

    // Delete each collection
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).drop();
      console.log(`Collection '${collection.name}' deleted.`);
    }

    console.log('All collections deleted successfully.');
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
  }
}

const connection_url  = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`

// Example usage
if(process.env.REMOTE_MONGO){
    deleteAllCollections(process.env.REMOTE_MONGO);
}
else{
    throw new Error(`there is no mong url`)
}

