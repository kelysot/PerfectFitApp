const { ObjectID } = require("bson")
const { Int32 } = require("mongodb")
const mongoose = require("mongoose")
const profile_model = require("./profile_model")

const postSchema = new mongoose.Schema({
    profileId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    sizeAdjustment: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    picturesUrl: [{
        type: String
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

module.exports = mongoose.model('Post', postSchema)
