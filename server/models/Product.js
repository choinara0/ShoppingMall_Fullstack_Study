const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

})


const Product = mongoose.model('User', productSchema);

module.exports = { Product }