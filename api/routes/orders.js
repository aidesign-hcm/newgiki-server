const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

// const checkAuth = require('../middleware/check-auth')

const orderController = require('../controllers/orders')


router.get('/', checkAuth, orderController.orders_get_all )

// router.post('/', checkAuth, orderController.orders_create_order )

// router.get('/user/:orderId', checkAuth, orderController.orders_get_order);

router.get('/checkout/:id', orderController.orders_get_order);

router.get('/user', checkAuth, orderController.orders_get_userorder);

router.delete('/:orderId', checkAuth, orderController.orders_delete_order);

module.exports = router