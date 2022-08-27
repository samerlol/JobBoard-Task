import Joi from "joi";

const joiCreateCompany = () => {
    return Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        description: Joi.string()
            .min(10)
            .max(300)
            .required(),

        email: Joi.string()
            .email().required(),
        userId: Joi.number()
            .required(),
    })

};



export default joiCreateCompany;