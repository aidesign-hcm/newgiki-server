const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

// const checkAuth = require('../middleware/check-auth')

const userController = require('../controllers/auth')

router.get('/users', checkAuth, userController.user_get_all)

router.post('/signup', userController.user_signup)

router.post('/login', userController.user_login)

router.get('/user', checkAuth, userController.user_profile)

router.delete('/:userId', checkAuth, userController.user_delete),

module.exports = router