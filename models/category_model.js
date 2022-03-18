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
    menSubCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }],
    womenSubCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    }]
})

module.exports = mongoose.model('Category', categorySchema)
