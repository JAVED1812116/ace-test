const express = require('express');
const router = express.Router()

const protectedController = require('../../controllers/protected_controllers');
router.get('/users', protectedController)





module.exports = router