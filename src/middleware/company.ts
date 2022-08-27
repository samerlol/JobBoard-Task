import { joiCreateCompany } from "../validations";
import { Request, Response, NextFunction } from 'express';

export default function createCompany(req: Request, res: Response, next: NextFunction) {
    const { error } = joiCreateCompany().validate({ ...req.body });
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
}
