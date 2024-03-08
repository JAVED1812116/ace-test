const { JOI_Validations } = require('../../services/joi_services');
const { Bcrypt_Service } = require('../../services/bcrypt_services');
const { User_Auth_Schema } = require('../../models/user_auth_model');
const { user_type_constant } = require('../../utils/constants');
const User_DTO = require('../../dto/user_dto');
const { JWT_Generate_Token_Handle } = require('../../services/jwt_services');
const Auth_Token_DTO = require('../../dto/auth_tokens_dto');
const { User_Tokens_Schema } = require('../../models/user_tokens_model');


const register_user = async (req, res, next) => {
    const { body } = req
    try {
        const { username, password } = body
        // 2. if error in validation -> return error via middleware
        const validation_error = JOI_Validations.user_register_joi_validation(body)
        if (validation_error) {
            return next(validation_error);
        }
        const is_email_exist = await User_Auth_Schema.exists({ username })
        if (is_email_exist) {
            const error = {
                status: 409,
                message: "User is already exist with this username!",
            };
            return next(error);
        }

        const secure_password = await Bcrypt_Service.bcrypt_hash_password(password)

        const store_user_data = {
            username,
            password: secure_password,
        }

        const save_user = await User_Auth_Schema.create({
            ...store_user_data
        })

        const user_dto = new User_DTO(save_user)

        const generate_tokens = await JWT_Generate_Token_Handle.save_user_tokens(user_dto._id)


        const save_tokens = await User_Tokens_Schema.create({
            access_token:generate_tokens,
            user_id: user_dto._id,
        })


        const tokens_dto = new Auth_Token_DTO(save_tokens)


        return res.json({
            message: 'Registered successfully!', data: user_dto, tokens: tokens_dto
        })


    } catch (error) {
        return next(error)
    }

}



const login_user = async (req, res, next) => {
    const { body } = req
    try {
        const { username, password } = body
        // 2. if error in validation -> return error via middleware
        const validation_error = JOI_Validations.user_login_joi_validation(body)
        if (validation_error) {
            return next(validation_error);
        }
        const find_user = await User_Auth_Schema.findOne({ username })
        if (!find_user) {
            const error = {
                status: 401,
                message: "Invalid credentials!",
            };
            return next(error);
        }

        const compare_password = await Bcrypt_Service.bcrypt_compare_password(password, find_user.password)

        if (!compare_password) {
            const error = {
                status: 401,
                message: "Invalid credentials!",
            };
            return next(error);
        }

        const user_dto = new User_DTO(find_user)

        const generate_tokens = await JWT_Generate_Token_Handle.save_user_tokens(user_dto._id)

        const save_tokens = await User_Tokens_Schema.create({
            access_token:generate_tokens,
            user_id: user_dto._id,
        })

        const tokens_dto = new Auth_Token_DTO(save_tokens)

        return res.json({
            message: 'logged in successfully!', data: user_dto, tokens: tokens_dto
        })

    } catch (error) {
        return next(error)
    }

}
const logout_controller = async (req, res, next) => {
    const { body, user_data, user_id, token_id } = req

    try {
        await User_Tokens_Schema.findByIdAndDelete(token_id);
       return res.status(200).json({ success:true, message:'Logged out successfully'});
    } catch (error) {
        return next(error);
    }
}



module.exports = { register_user, login_user,  logout_controller }