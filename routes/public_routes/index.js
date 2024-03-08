const express = require('express');
const { register_user, login_user } = require('../../controllers/auth_controllers');
const check_user_auth = require('../../middlewares/check_user_auth');
const router = express.Router()


router.post('/register',  register_user)
router.post('/login', login_user)

module.exports = router