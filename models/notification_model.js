const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    profileIdMine: {
        type: String,
        required: true
    },
    profileIdFrom: {
        type: String,
        required: true
    },
    notificationType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Notification', notificationSchema)
