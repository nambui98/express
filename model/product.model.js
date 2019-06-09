var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sesstion' },
    name: String,
    image: String,
    name: String,
    description: String
})
var Product = mongoose.model('Product', productSchema, 'products')
module.exports = Product;