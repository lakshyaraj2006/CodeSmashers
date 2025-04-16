import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    name?: string,
    username: string,
    email: string,
    image?: string,
    password?: string,
    updatedAt: Date,
    createdAt: Date
};

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true });

export const UserModel = mongoose.model("User", UserSchema);
