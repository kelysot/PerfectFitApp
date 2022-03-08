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

const getProfileById = async (req, res) => {

    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        profiles = await Profile.findById(req.params.id)
        res.status(200).send(profiles)

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const editProfile = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try{
        const editProfile = await Profile.findById(req.params.id)
        editProfile.firstName = req.body.firstName
        editProfile.lastName = req.body.lastName,
        editProfile.gender = req.body.gender,
        editProfile.userName = req.body.userName,
        editProfile.birthday = req.body.birthday,
        editProfile.pictureUrl = req.body.pictureUrl,
        editProfile.shoulder = req.body.shoulder,
        editProfile.chest = req.body.chest,
        editProfile.basin = req.body.basin,
        editProfile.waist = req.body.waist,
        editProfile.foot = req.body.foot,
        editProfile.height = req.body.height,
        editProfile.weight = req.body.weight,
        editProfile.bodyType = req.body.bodyType,
        editProfile.status = req.body.status,
        editProfile.similarProfileId = req.body.similarProfileId,
        editProfile.followers = req.body.followers,
        editProfile.trackers = req.body.trackers,
        editProfile.notifications = req.body.notifications,
        editProfile.wishlist = req.body.wishlist,
        editProfile.myPostsListId = req.body.myPostsListId

        editProfile.save((error,editProfile)=>{
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }else{
                res.status(200).send({
                    'status': 'OK',
                    'profile': editProfile
                })
            }
        })
    }catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        }) 
    }
}

const deleteProfile = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try{
        const profileToDelete = await Profile.findById(req.params.id)
        profileToDelete.remove((error)=>{
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
    }catch (err) {
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
    deleteProfile
}