import Joi from "joi";

const joiValidateApiKey = () => {
    return Joi.object({
        "X-API-KEY": Joi.string()
            .required(),
    });

};

export default joiValidateApiKey;