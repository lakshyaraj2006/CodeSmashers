import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { RefreshTokenPayload } from "../utils/jwtpayload";

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

const login = asyncHandler(
    async (req: Request, res: Response) => {
        const { identifier, password } = req.body;
        let success = false;

        const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

        let user = null;

        if (usernameRegex.test(identifier)) {
            user = await UserModel.findOne({ username: identifier });
        } else if (emailRegex.test(identifier)) {
            user = await UserModel.findOne({ email: identifier });
        }

        if (user) {
            const checkPasswordResult = await user.checkPassword(password);

            if (checkPasswordResult) {
                const accessToken = user.generateAccessToken();
                const refreshToken = user.generateRefreshToken();

                res.cookie("refreshtoken", refreshToken, {
                    secure: process.env.NODE_ENV === "production",
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
                success = true;

                res.status(200).json({
                    success,
                    message: "Logged in successfully!",
                    accessToken
                })
            }
        } else {
            res.status(404).json({
                success,
                message: "User was not found!"
            })
        }
    }
);

const logout = asyncHandler(
    (req: Request, res: Response) => {
        let success = false;
        if (req.cookies["refreshtoken"]) {
            res.clearCookie("refreshtoken");
            success = true;

            res.status(200).json({
                success,
                message: "Logged out successfully!"
            })
        } else {
            res.status(401).json({
                success,
                message: "Unauthorized request!"
            })
        }
    }
);

const refreshToken = asyncHandler(
    async (req: Request, res: Response) => {
        const cookies = req.cookies;

        if (cookies["refreshtoken"]) {
            try {
                
                const decoded = jwt.verify(cookies["refreshtoken"], process.env.REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;

                const user = await UserModel.findById(decoded._id);

                const newAccessToken = user?.generateAccessToken();

                res.status(200).json({
                    accessToken: newAccessToken
                })
            } catch (error) {
                res.status(401).json({
                    message: "Invalid or expired token!"
                })
            }
        } else {
            res.status(401).json({
                message: "Unauthorized request!"
            })
        }
    }
);

export const AuthController = { signup, login, logout, refreshToken };
