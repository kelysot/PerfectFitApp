const Profile = require('../models/profile_model')
const User = require('../models/user_model')

const getProfile = async (req, res) => {

    const email = req.params.email
    const userName = req.params.userName

    console.log("the email: " + email)
    console.log("the userName: " + userName)


    if (email == null || email == undefined || userName == null || userName == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const profileArr = await Profile.find({ 'userId': email })
        var profile;

        profileArr.forEach(element => {
            if (element._doc.userName == userName) {
                profile = element._doc
            }
        });

        const sendprofile = profile
        res.status(200).send(sendprofile)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
        console.log("--------------- " + err.message)
    }


}

const addNewProfile = async (req, res) => {

    const email = req.body.userId
    const user = await User.findOne({ email: { $eq: email } })

    const profile = Profile({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        userName: req.body.userName,
        birthday: req.body.birthday,
        pictureUrl: "picture",
        shoulder: req.body.shoulder,
        chest: req.body.chest,
        basin: req.body.basin,
        waist: req.body.waist,
        foot: req.body.foot,
        height: req.body.height,
        weight: req.body.weight,
        bodyType: req.body.bodyType,
        status: true,
        similarProfileId: [],
        followers: [],
        trackers: [],
        notifications: [],
        wishlist: [],
        myPostsListId: []
    })

    profile.save((error, profile) => {

        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200).send({
                'status': 'OK',
                'profile': profile
            })
        }
    })

    user.profilesId.push(profile.userName)

    await user.save((error) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200)
        }
    })
}

const getProfileById = async (req, res) => {

    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        var profileId = req.params.id
        profileId = profileId.substring(1)
        profiles = await Profile.findById(profileId)
        res.status(200).send(profiles)

    } catch (err) {

        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const editProfile = async (req, res) => {
    const userName = req.body.userName
    if (userName == null || userName == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const newEditProfile = await Profile.findOne({ 'userName': userName })
        newEditProfile.firstName = req.body.firstName
        newEditProfile.lastName = req.body.lastName
        newEditProfile.gender = req.body.gender
        newEditProfile.userName = req.body.userName
        newEditProfile.birthday = req.body.birthday
        newEditProfile.pictureUrl = req.body.pictureUrl
        newEditProfile.shoulder = req.body.shoulder
        newEditProfile.chest = req.body.chest
        newEditProfile.basin = req.body.basin
        newEditProfile.waist = req.body.waist
        newEditProfile.foot = req.body.foot
        newEditProfile.height = req.body.height
        newEditProfile.weight = req.body.weight
        newEditProfile.bodyType = req.body.bodyType
        newEditProfile.status = req.body.status
        newEditProfile.similarProfileId = req.body.similarProfileId
        newEditProfile.followers = req.body.followers
        newEditProfile.trackers = req.body.trackers
        newEditProfile.notifications = req.body.notifications
        newEditProfile.wishlist = req.body.wishlist
        newEditProfile.myPostsListId = req.body.myPostsListId

        newEditProfile.save((error, newEditProfile) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send({
                    'status': 'OK',
                    'profile': newEditProfile
                })
            }
        })
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const checkIfUserNameExist = async (req, res) => {
    const userName = req.params.userName
    const exist = await Profile.findOne({ 'userName': userName })
    if (exist != null) {
        return res.status(400).send({
            'status': 'fail',
            'error': 'userName exist'
        })
    }
    else {
        res.status(200).send({
            'status': 'OK'
        })
    }
}

//TODO: delete from user too

const deleteProfile = async (req, res) => {
    if (req.params.userName == null || req.params.userName == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const profileToDelete = await Profile.findOne({'userName' : req.params.userName})
        profileToDelete.remove((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The profile was deleted successfully'
                })
            }
        })
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    addNewProfile,
    getProfileById,
    editProfile,
    deleteProfile,
    getProfile,
    checkIfUserNameExist
}