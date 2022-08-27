import joiCreateUser from "../validations/users";
import express, { Request, Response, NextFunction } from 'express';


export default function createUser(req: Request, res: Response, next: NextFunction) {
    const { password, confirmPassword, email, firstName, lastName } = req.body;
    const { error } = joiCreateUser().validate({ password, confirmPassword, email, firstName, lastName });
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
}

