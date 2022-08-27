import { RequestHandler, Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { Vacancy, Applied_Vacancies } from "../models";
import moment from "moment";


type errorType = {
    ValidationErrorItem: object,
    path: string,
    message: string
}
const JobApplyDailyLimit = 3;

export const createVacancy: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacancy = await Vacancy.create({ ...req.body });

        return res
            .status(201)
            .json({ success: true, message: "Vacancy created successfully", data: vacancy });


    } catch (error: any) {
        const errorList = error.errors?.map((err: errorType) => error[err.path] = err.message);
        return res.status(400).send({ success: false, message: "Error", data: errorList });
    }
};

export const closeVacancy: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { companyId } = req.body;
    const closedVacancy = await Vacancy.update({ status: "closed" }, {
        where: {
            id,
            companyId
        }
    });

    return closedVacancy[0] > 0 ? res.status(200).json({ success: true, message: "Vacancy closed successfully.", data: closedVacancy })
        : res.status(404).json({ success: false, message: "Vacancy not Found.", data: closedVacancy })


};

export const getAllVacancies: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const allVacancies: Vacancy[] = await Vacancy.findAll({
        where: {
            status: "open"
        }
    });
    return res.status(200).json({ message: "Vacancy fetched successfully.", data: allVacancies });

};

export const searchVacany: RequestHandler = async (req, res, next) => {
    const { yearsOfExperience } = req.query;
    const { rows, count } = await Vacancy.findAndCountAll({
        where: {
            [Op.and]: {
                yearsOfExperience,
                status: "open"
            }
        }
    });
    return res.status(200).json({
        message: "Vacancy fetched successfully.", data: {
            rows,
            count
        }
    });
};


export const updateVacancy: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await Vacancy.update({ ...req.body }, { where: { id } });
    const updatedVacancy: Vacancy | null = await Vacancy.findByPk(id);
    return res.status(200).json({ message: "Vacancy Updated Successfully.", data: updatedVacancy });


};

export const applyOnVacany: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: vacancyId } = req.params;
        const { userId } = req.body;
        const TODAY_Date = moment().format('YYYY-MM-DD');

        const checkDuplicate = await Applied_Vacancies.findOne({
            where: {
                userId,
                vacancyId
            }
        });

        if (checkDuplicate) {
            return res.status(400).send({ success: false, message: "User already has applied to this job." });
        }

        const checkDailyLimit = await Applied_Vacancies.count({
            where: {
                [Op.and]: {
                    userId,
                    createdAt: {
                        [Op.substring]: `%${TODAY_Date}%`
                    }
                }
            }
        });

        if (checkDailyLimit > JobApplyDailyLimit) {
            return res.status(400).send({ success: false, message: "Daily Limit reached, please try tomorrow." });
        }

        const checkVacancyIfExists = await Vacancy.findOne({
            where: {
                id: vacancyId
            }
        });

        if (!checkVacancyIfExists) {
            return res.status(400).send({ success: false, message: "Vacancy doesn't exists." });
        }
        const vacancy = await Applied_Vacancies.create({ userId, vacancyId });

        return res
            .status(201)
            .json({ success: true, message: "Applied successfully", data: vacancy });


    } catch (error: any) {
        const errorList = error.errors?.map((err: errorType) => error[err.path] = err.message);
        return res.status(400).send({ success: false, message: "Error", data: errorList });
    }
};