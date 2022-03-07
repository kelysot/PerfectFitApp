const Profile = require('../models/profile_model')

const addNewProfile = (req, res) => {

    console.log('addNewProfile ' + req.body.firstName)
    userId = req.user.id

    const profile = Profile({
        userId: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        userName: req.body.userName,
        birthday: req.body.birthday,
        pictureUrl: req.body.pictureUrl,
        shoulder: req.body.shoulder,
        chest: req.body.chest,
        basin: req.body.basin,
        waist: req.body.waist,
        foot: req.body.foot,
        height: req.body.height,
        weight: req.body.weight,
        bodyType: req.body.bodyType,
        status: req.body.status,
        similarProfileId: [],
        followers: [],
        trackers: [],
        notifications: [],
        wishlist: [],
        myPostsListId: []
    })

    profile.save((error, newProfile) => {

        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200).send({
                'status': 'OK',
                'profile': newProfile
            })

        }
    })
}

module.exports = {
    addNewProfile
}