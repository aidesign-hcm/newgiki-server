const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const Order = require('../models/orders');
const mongoose = require("mongoose");
const moment = require('moment');

router.post('/', checkAuth, async (req,res) => {
    try {
        let order = new Order();
        let cart = req.body.cart;
        order._id = new mongoose.Types.ObjectId(),
        cart.map(product => {
            order.products.push({
                productId : product._id,
                quantity: parseInt(product.quantity),
                price: product.price,
                term: product.term
            })
        })
        order.buyer = req.decoded._id;
        order.receiveAdd = req.body.receiveAdd
        order.totalPrice = req.body.totalPrice;
        order.estimatedDelivery = req.body.estimatedDelivery;
        order.date = moment();
        await order.save();
        console.log(order)
        res.json({
            success: true,
            meassage: "Create successfully a payment",
            order
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
          message: "Can't Payment",
          error: err,
        });
      }
})

router.post('/customer', async (req,res) => {
    try {
        let order = new Order();
        let cart = req.body.cart;
        order._id = new mongoose.Types.ObjectId(),
        cart.map(product => {
            order.products.push({
                productId : product._id,
                quantity: parseInt(product.quantity),
                price: product.price,
                term: Product.term
            })
        })
        order.receiveAdd = req.body.receiveAdd
        order.totalPrice = req.body.totalPrice;
        order.estimatedDelivery = req.body.estimatedDelivery;
        order.date = moment();
        await order.save();
        console.log(order)
        res.json({
            success: true,
            meassage: "Create successfully a payment",
            order
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
          message: "Can't Payment",
          error: err,
        });
      }
})

module.exports = router 