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
            if(element._doc.userName == userName){
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

    const email =  req.body.userId 
    const user = await User.findOne({email:{$eq:email}})

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

    profile.save((error, profile)=>{

        if(error){
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else{    
            res.status(200).send({
                'status': 'OK',
                'profile': profile
            })
        }
    })

    user.profilesId.push(profile.userName)

    await user.save((error)=>{
        if(error){
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else{
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
        console.log(req.params.id)
        var profileId = req.params.id
        profileId = profileId.substring(1)
        console.log(profileId)
        profiles = await Profile.findById(profileId)
        console.log(profiles)
        res.status(200).send(profiles)

    } catch (err) {

        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const editProfile = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
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

        editProfile.save((error, editProfile) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send({
                    'status': 'OK',
                    'profile': editProfile
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

const deleteProfile = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const profileToDelete = await Profile.findById(req.params.id)
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
    getProfile
}