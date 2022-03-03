const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('SubCategory', subCategorySchema)
