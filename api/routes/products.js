const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

// Import Controller
const productController = require('../controllers/products')
// Import Upload
const upload = require("../middleware/uploads-photo");

// 
router.get('/', productController.products_get_all )

router.get('/by-user', checkAuth, productController.product_byUser )

router.post('/', checkAuth, upload.single('productImage'), productController.products_create_product)

router.get('/:id', productController.products_get_product )

router.patch('/:id', checkAuth, upload.single('productImage'), productController.products_update_product )

router.put('/:id', checkAuth, upload.single('productImage'), productController.update_product_by_put)

router.delete('/:id', checkAuth, productController.products_delete )



module.exports = router