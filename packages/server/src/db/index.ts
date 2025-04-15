import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017/codesmashers");
    console.log("Connected to mongodb !!");
}