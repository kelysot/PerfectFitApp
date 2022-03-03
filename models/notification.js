const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    profileId: {
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
    }
})

module.exports = mongoose.model('Notification', notificationSchema)
