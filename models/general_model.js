const mongoose = require("mongoose")

const generalSchema = new mongoose.Schema({
    sizes: [{
        type: String,
    }],
    companies: [{
        type: String,
    }],
    colors: [{
        type: String,
    }],
    bodyTypes: [{
        type: String,
    }],
    bodyTypeDescription: [{
        type: String,
    }],
    gender: [{
        type: String,
    }]
})

module.exports = mongoose.model('General', generalSchema)