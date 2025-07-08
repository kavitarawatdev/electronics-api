const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.7,
    },
    reviews: {
        type: Number,
        default: 57,
    },
    stock: {
        type: Number,
        default: 7,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    colors: {
        type: [String],
        required: [true, "Colors are required"],
        validate: [arr => arr.length > 0, "At least one color must be provided"]
    },
    img: {
        type: String,
    },
    images: {
        type: [String],
        validate: [arr => arr.length > 0, "At least one additional image must be provided"]
    },
    company: {
        type: String,
        enum: {
            values: ["Apple", "Samsung", "HP", "Lenovo", "Sony", "LG", "Dell", "ASUS", "OnePlus", "realme", "Google"],
            message: `{VALUE} is not supported`
        },
    },
    category: {
        type: String,
        required: [true, "category is required"]
    }
})

module.exports = mongoose.model('Product', productSchema);