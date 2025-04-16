import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
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

UserSchema.pre("save", async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password as string, 12);
    next();
})

export const UserModel = mongoose.model("User", UserSchema);
