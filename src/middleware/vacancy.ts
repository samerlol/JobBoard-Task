import { joiCreateVacancy, joiSearchVacancy, joiApplyOnVacancy } from "../validations";
import express, { Request, Response, NextFunction } from 'express';
import { Company, User } from "../models"

async function createVacancy(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { title, description, yearsOfExperience, userId } = req.body;
    const company: Company | null = await Company.findOne({
        where: { userId }
    });
    if (!company) {
        return res.status(404).send({ success: false, message: "Company not found." });
    }
    const { error } = joiCreateVacancy().validate({ title, description, yearsOfExperience, companyId: company.id });
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    req.body.companyId = company.id;
    next();
};

function searchVacancy(req: Request, res: Response, next: NextFunction) {
    const { error } = joiSearchVacancy().validate({ ...req.query });
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
};


async function applyOnVacany(req: Request, res: Response, next: NextFunction) {
    const { id: vacancyId } = req.params;
    const { userId } = req.body;
    const { error } = joiApplyOnVacancy().validate({ vacancyId });
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    const user: User | null = await User.findOne({ where: { id: userId } });
    if (!user) {
        return res.status(404).send({ success: false, message: "User not found." });
    }
    next();
};
export { createVacancy, searchVacancy, applyOnVacany };