import { RequestHandler, Request, Response, NextFunction } from "express";

import { User } from "../models/user";
import { UserInterfaces } from "../interfaces";
import Passwords from '../utils/Passwords';

type errorType = {
    ValidationErrorItem: object,
    path: string,
    message: string
}

export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const password = new Passwords();
        const hashedPassword: string = req.body.password;
        req.body.password = await password.generateHash(hashedPassword);
        const user = await User.create({ ...req.body as UserInterfaces });
        res.setHeader("X-API-KEY", user.apiKey);
        return res
            .status(201)
            .json({ success: true, message: "User created successfully", data: user });


    } catch (error: any) {

        const errorList = error.errors.map((err: errorType) => error[err.path] = err.message);
        return res.status(400).send({ success: false, message: "Error", data: errorList });
    }
}

