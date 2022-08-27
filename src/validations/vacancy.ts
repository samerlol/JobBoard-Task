import Joi from "joi";

const joiCreateVacancy = () => {
    return Joi.object({
        title: Joi.string()
            .min(3)
            .max(30)
            .required(),
        description: Joi.string()
            .min(10)
            .max(500)
            .required(),

        yearsOfExperience: Joi.number().required(),
        companyId: Joi.number()
            .required(),
    })

};


const joiSearchVacancy = () => {
    return Joi.object({
        yearsOfExperience: Joi.number()
            .required(),
    })

};

const joiApplyOnVacancy = () => {
    return Joi.object({
        vacancyId: Joi.string()
            .required(),
    })

};



export { joiSearchVacancy, joiCreateVacancy, joiApplyOnVacancy };