const mongoose = require('mongoose');
const {user_type_constant } = require('../utils/constants');

const { Schema } = mongoose;
const User_Auth_Schema = mongoose.model('user', new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true }
))


module.exports = { User_Auth_Schema }
