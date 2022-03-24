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
        ref: 'category'
    }],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
})

module.exports = mongoose.model('SubCategory', subCategorySchema)
