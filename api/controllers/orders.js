const mongoose = require("mongoose");

const Order = require("../models/orders");
const Product = require("../models/products");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// exports.orders_create_order = (req, res, next) => {
//   Product.findById(req.body.productId)
//     .then(product => {
//       if (!product) {
//         return res.status(404).json({
//           message: "Product not found"
//         });
//       }
//       const order = new Order({
//         _id: mongoose.Types.ObjectId(),
//         quantity: req.body.quantity,
//         product: req.body.productId
//       });
//       return order.save();
//     })
//     .then(result => {
//       console.log(result);
//       res.status(201).json({
//         message: "Order stored",
//         createdOrder: {
//           _id: result._id,
//           product: result.product,
//           quantity: result.quantity
//         },
//         request: {
//           type: "GET",
//           url: "http://localhost:3000/api/orders/" + result._id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };

exports.orders_get_order = async (req, res, next) => {
  try {
    const id = await req.params.id;
    const order = await Order.findById(id)
    .deepPopulate("buyer products.productId.User")
    .exec();
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }
    res.status(200).json({
      order: order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Your order Error",
    });
  }
  
};

exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/pai/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_get_userorder = async (req,res) => {
  try {
      let products = await Order.find({ buyer: req.decoded._id })
      .deepPopulate("buyer products.productId.User")
      .exec();
      res.json({
          success: true,
          products: products
      });
  } catch(err){
    console.log(err)
      res.status(404).json({
          success: false,
          message: "ko get duoc"
      })
  }
}