const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isConnected: {
        type: String,
        required: true
    },
    tokens: {
        type: [String]
    }
})

module.exports = mongoose.model('Admin', categorySchema)
