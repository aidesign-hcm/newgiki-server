const express = require('express')
const router = express.Router();

// const checkAuth = require('../middleware/check-auth')

const orderController = require('../controllers/orders')


router.get('/', orderController.orders_get_all )

router.post('/', orderController.orders_create_order )

router.get("/:orderId", orderController.orders_get_order);

router.delete("/:orderId", orderController.orders_delete_order);

module.exports = router