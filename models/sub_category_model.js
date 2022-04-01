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
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
})

module.exports = mongoose.model('SubCategory', subCategorySchema)
