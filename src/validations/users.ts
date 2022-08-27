import Joi from "joi";

const joiCreateUser = () => {
    return Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('[a-zA-Z]'))
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp('[a-zA-Z]'))
            .required(),
        password: Joi.string().min(8).max(16)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

        confirmPassword: Joi.ref('password'),

        email: Joi.string()
            .email().required()
    })
        .with('password', 'confirmPassword');

};

export default joiCreateUser;