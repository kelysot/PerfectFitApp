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
        required: true
    },
    shoulder: {
        type: String,
        required: true
    },
    chest: {
        type: String,
        required: true
    },
    basin: {
        type: String,
        required: true
    },
    waist: {
        type: String,
        required: true
    },
    foot: {
        type: String,
        required: true
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
        type: Boolean,
        required: true
    },
    similarProfileId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    trackers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
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