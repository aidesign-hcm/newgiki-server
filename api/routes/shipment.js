const express = require('express');
const router = express.Router();
const moment = require('moment');

const SHIPMENT = {
    normal: {
        days: 7,
        price: 30000
    },
    fast: {
        days:3,
        price: 50000
    }
};

function shipmentPrice(shipmentOption){//3, Set ngay giao hang
    let estimated = moment().locale('vi').add(shipmentOption.days, "d").format('dddd, Do, MMMM');
    return {estimated, price: shipmentOption.price} // 4 trả về kết quả ngày giao và giá
}

router.post('/', (req, res) =>{
    let shipment; // 1. Lay giu lieu post len tu frontend
    if(req.body.shipment === "normal"){// 2. kiem tra giu lieu
        shipment = shipmentPrice(SHIPMENT.normal) 
    } else {
        shipment = shipmentPrice(SHIPMENT.fast)
    }
    res.status(200).json({
        success: true,
        shipment: shipment
    })
})

// router.post('/payment', verifyToken, (req,res) => {
//     let totalPrice = Math.round(req.body.totalPrice * 100);
//     console.log(totalPrice)
//     stripe.customers.create({
//         email: req.decoded.email,
//     })
//     .then(customer => {
//         return stripe.customers.createSource(customer.id, {
//             source: "tok_visa"
//         })
//     })
//     .then(source => {
//         return  stripe.charges.create({
//             amount: totalPrice,
//             currency: "usd",
//             customer: source.customer
//         })
//     })
//     .then(async charge => {
//         let order = new Order();
//         let cart = req.body.cart;

//         cart.map(product => {
//             order.products.push({
//                 productId : product._id,
//                 quantity: parseInt(product.quantity),
//                 price: product.price
//             })
//         })
//         order.owner = req.decoded._id;
//         order.estimatedDelivery  = req.body.estimatedDelivery;
//         await order.save();
//         res.json({
//             success: true,
//             meassage: "Create successfully a payment"
//         })
//     })
//     .catch(err => {
//         res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     })
// })

module.exports = router 
