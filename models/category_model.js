const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menSubCategory: [{
        type: String,
        ref: 'SubCategory'
    }],
    womenSubCategory: [{
        type: String,
        ref: 'SubCategory'
    }]
})

module.exports = mongoose.model('Category', categorySchema)
