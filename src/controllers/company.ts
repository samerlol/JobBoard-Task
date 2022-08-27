import { RequestHandler, Request, Response, NextFunction } from "express";
import { Company } from "../models";

type errorType = {
    ValidationErrorItem: object,
    path: string,
    message: string
}

export const createCompany: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const checkDuplicate = await Company.findOne({
            where: {
                userId
            }
        });

        if (checkDuplicate) {
            return res.status(400).send({ success: false, message: "User already has a company." });
        }
        const company = await Company.create({ ...req.body });

        return res
            .status(201)
            .json({ success: true, message: "Company created successfully", data: company });


    } catch (error: any) {

        const errorList = error.errors.map((err: errorType) => error[err.path] = err.message);
        return res.status(400).send({ success: false, message: "Error", data: errorList });
    }
}