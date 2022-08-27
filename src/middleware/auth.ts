
import { joiValidateApiKey } from "../validations";
import { Request, Response, NextFunction } from "express";
import { User } from "../models"


export default async function validateApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey: string | undefined = req.header("X-API-KEY");
    const { error } = joiValidateApiKey().validate({ "X-API-KEY": apiKey });
    if (error) {
        return res.status(401).send({ message: error.details[0].message });
    }
    const user = await User.findOne({
        where: {
            apiKey
        }
    });
    if (!user) {
        return res.status(401).send({ success: false, message: "Wrong API Key Used." })

    }
    req.body.userId = user.id;
    next();
}