const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const categoryController  = require('../controllers/categories')

router.post('/', checkAuth, categoryController.create_category)

router.get('/', categoryController.get_category)

module.exports = router 