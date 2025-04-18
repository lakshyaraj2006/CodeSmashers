import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface User extends Document {
    name?: string;
    username: string;
    email: string;
    image?: string;
    password?: string;
    updatedAt: Date;
    createdAt: Date;
    checkPassword: (password: string) => Promise<boolean>,
    generateAccessToken: () => string,
    generateRefreshToken: () => string
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
});

UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    const payload = { _id: this._id, email: this.email };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15min"
    });
};

UserSchema.methods.generateRefreshToken = function () {
    const payload = { _id: this._id };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "30d"
    });
};

export const UserModel = mongoose.model<User>("User", UserSchema);
