const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    profileId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)
