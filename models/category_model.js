const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }]
})

module.exports = mongoose.model('Category', categorySchema)
