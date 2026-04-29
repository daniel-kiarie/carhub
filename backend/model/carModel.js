const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    title: {type: String, required: true},
    brand: {type: String, required: true },
    model: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    mileage: {type: Number, required: true},
    fuelType: {type: String, required: true},
    transmission: {type: String, required: true},
    color: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    instock: {type: Boolean, default: true},
    featured: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true})


module.exports = mongoose.model('Car', CarSchema)