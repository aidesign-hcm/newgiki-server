const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    street: {type: String, default: ''},
    apartment: {type: String, default: ''},
    district: {type: String, default: ''},
    city: {type: String, default: ''},
    phoneNumber: {type: Number, default: ''},
})

module.exports = mongoose.model('Address', addressSchema)