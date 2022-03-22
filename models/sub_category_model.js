const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },
    belongsTo: [{
        type: String,
        ref:'category'
    }],
    categoryId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('SubCategory', subCategorySchema)
