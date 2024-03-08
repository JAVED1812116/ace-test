const Joi = require("joi");
const { user_role_constanst, user_type_constant } = require("../utils/constants");


const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

class JOI_Service {
    // Check email pattern
    static joi_username_string() {
        return Joi.string().required()
    }

    // Check password pattern
    static joi_password_pattern() {
        return Joi.string().pattern(passwordPattern).required()
    }

    // Check confirm password
    static joi_confirm_password_pattern() {
        return Joi.ref("password")
    }

    // Check user role enum
    static joi_user_role_enum() {
        return Joi.string().valid([...Object.values([...user_type_constant])]).required();
    }
}


class JOI_Validations {
    static user_register_joi_validation(payload) {
        const userRegisterSchema = Joi.object({
            username: JOI_Service.joi_username_string(),
            password: JOI_Service.joi_password_pattern(),
        })
        const { error } = userRegisterSchema.validate(payload);
        return error
    }
    static user_login_joi_validation(payload) {
        const userRegisterSchema = Joi.object({
            username: JOI_Service.joi_username_string(),
            password: JOI_Service.joi_password_pattern(),
        })
        const { error } = userRegisterSchema.validate(payload);
        return error
    }

}



module.exports = { JOI_Service, JOI_Validations }