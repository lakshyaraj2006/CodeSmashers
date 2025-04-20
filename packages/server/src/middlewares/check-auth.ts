import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AccessTokenPayload } from "../utils/jwtpayload";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if (authorization) {
        const accessToken = authorization.split('Bearer ')[1];

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload;

            req.user = decoded._id;

            next();
        } catch (error) {
            res.status(403).json({
                message: "Forbidden!"
            })
        }
    } else {
        res.status(403).json({
            message: "Forbidden!"
        })
    }
}