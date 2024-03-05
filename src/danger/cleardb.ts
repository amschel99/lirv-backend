import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function deleteAllCollections(mongoUri: string): Promise<void> {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    // Get the list of collection names
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    // Delete each collection
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).drop();
      console.log(`Collection '${collection.name}' deleted.`);
    }

    console.log("All collections deleted successfully.");
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
  }
}

deleteAllCollections(
  "mongodb+srv://nichlabs:4JsAR0yT34fUO1Iq@nichlabsapp.thoorlb.mongodb.net/?retryWrites=true&w=majority&appName=NichlabsApp"
);
