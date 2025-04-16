import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { UserModel } from "../models/user.model";

const signup = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, username, email, password } = req.body;
        let success = false;

        // Check if the user exists
        let user = await UserModel.findOne({
            $or: [{ username }, { email }]
        });

        if (user) {
            res.status(400).json({
                success,
                message: "Username or email already taken!"
            })
        } else {
            user = await UserModel.create({
                name,
                username,
                email,
                password
            });

            success = true;
            res.status(201).json({
                success,
                message: "User account created successfully!"
            })
        };
    }
);

export const AuthController = { signup };
