const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    profilesId: [{
        type: String,
        ref: 'Profile'
    }],
    tokens: {
        type: [String]
    }

})

module.exports = mongoose.model('User', userSchema)
