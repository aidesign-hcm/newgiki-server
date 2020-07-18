const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const upload = require("../middleware/uploads-photo");
const User = require("../models/users");

// const checkAuth = require('../middleware/check-auth')

const userController = require('../controllers/users')

router.get('/users', checkAuth, userController.user_get_all)

router.post('/signup', userController.user_signup)

router.post('/login', userController.user_login)

router.get('/user', checkAuth, userController.user_profile)

router.post('/user/avatar', checkAuth, upload.single('avatar'), userController.user_avatar)

router.delete('/user/avatar/:id', checkAuth, userController.user_delete_avatar)

router.delete('/:userId', checkAuth, userController.user_delete),



module.exports = router