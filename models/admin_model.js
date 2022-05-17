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
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
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
        lastWeek: {type: String, required: true},
        total: {type: String, required: true},
        percent:{type: String, required: true}
    },
    profilesLoginCompere: {
        lastWeek: {type: String, required: true},
        total: {type: String, required: true},
        percent:{type: String, required: true}
    },
    totalUsersCompere: {
        lastWeek: {type: String, required: true},
        total: {type: String, required: true},
        percent:{type: String, required: true}
    },
    totalPostCompere: {
        lastWeek: {type: String, required: true},
        total: {type: String, required: true},
        percent:{type: String, required: true}
    }
})

module.exports = mongoose.model('Admin', adminSchema)
