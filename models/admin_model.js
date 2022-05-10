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
    },
    lastUpdate: {
        type: String,
        required: true
    },
    newProfilesCompere: {
        type: String,
        required: true
    },
    totalUsersCompere: {
        type: String,
        required: true
    },
    totalPostCompere: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)
