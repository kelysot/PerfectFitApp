const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
        required: false
    },
    shoulder: {
        type: String,
        required: false
    },
    chest: {
        type: String,
        required: false
    },
    basin: {
        type: String,
        required: false
    },
    waist: {
        type: String,
        required: false
    },
    foot: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    bodyType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    similarProfileId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    followers: [{
        type: String,
    }],
    trackers: [{
        type: String,
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    myPostsListId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

module.exports = mongoose.model('Profile', profileSchema)