import { error } from "console";
import mongoose from "mongoose";

const mongoDB_Connection = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected  Successfully.");
    });

    mongoose.connection.on("error", () => {
      console.log("Error in connected database.", error);
    });

    await mongoose.connect(process.env.MONGO_URL as string);

  } catch (error) {
    console.log("Failed connection database =>", error);
    process.exit(1); // to stop entire website
  }
};

export default mongoDB_Connection;
