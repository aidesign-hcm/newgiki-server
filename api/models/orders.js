const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    products: [
        {
            productId: {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
            price: Number,
            term: String
        }
    ],
    estimatedDelivery: String,
    date: { type: Date, default: Date.now },
    totalPrice: Number,
    receiveAdd: { type: Object }
})

orderSchema.plugin(deepPopulate);

module.exports = mongoose.model('Order', orderSchema)