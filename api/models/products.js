const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User: {type: Schema.Types.ObjectId, ref: 'User'},
    Category: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    desc: {type: String, required: true },
    StockQuantity: {type: Number},
    date: { type:Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);