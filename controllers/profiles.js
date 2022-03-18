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

    const previousName = req.body.previousName
    let userName = req.body.userName
    if (userName == null || userName == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    console.log("the user nameeeeeee: " + userName)
    if(previousName != null && previousName != undefined){
       userName = previousName
       console.log("previousName: " + userName)
    }


    console.log("**********************************************************")

    try {
        const newEditProfile = await Profile.findOne({ 'userName': userName })
        newEditProfile.firstName = req.body.firstName
        console.log("--- " + newEditProfile.firstName)
        newEditProfile.lastName = req.body.lastName
        console.log("--- " + newEditProfile.lastName)
        newEditProfile.gender = req.body.gender
        console.log("--- " + newEditProfile.gender)
        newEditProfile.userName = req.body.userName
        console.log("--- " + newEditProfile.userName)
        newEditProfile.birthday = req.body.birthday
        console.log("--- " + newEditProfile.birthday)
        newEditProfile.pictureUrl = req.body.pictureUrl
        console.log("--- " + newEditProfile.pictureUrl)
        newEditProfile.shoulder = req.body.shoulder
        console.log("--- " + newEditProfile.shoulder)
        newEditProfile.chest = req.body.chest
        console.log("--- " + newEditProfile.chest)
        newEditProfile.basin = req.body.basin
        console.log("--- " + newEditProfile.basin)
        newEditProfile.waist = req.body.waist
        console.log("--- " + newEditProfile.waist)
        newEditProfile.foot = req.body.foot
        console.log("--- " + newEditProfile.foot)
        newEditProfile.height = req.body.height
        console.log("--- " + newEditProfile.height)
        newEditProfile.weight = req.body.weight
        console.log("--- " + newEditProfile.weight)
        newEditProfile.bodyType = req.body.bodyType
        console.log("--- " + newEditProfile.bodyType)
        newEditProfile.status = req.body.status
        console.log("--- " + newEditProfile.status)
        newEditProfile.similarProfileId = req.body.similarProfileId
        console.log("--- " + newEditProfile.similarProfileId)
        newEditProfile.followers = req.body.followers
        console.log("--- " + newEditProfile.followers)
        newEditProfile.trackers = req.body.trackers
        console.log("--- " + newEditProfile.trackers)
        newEditProfile.notifications = req.body.notifications
        console.log("--- " + newEditProfile.notifications)
        newEditProfile.wishlist = req.body.wishlist
        console.log("--- " + newEditProfile.wishlist)
        newEditProfile.myPostsListId = req.body.myPostsListId 
        console.log("--- " + newEditProfile.myPostsListId)

        console.log("****************************************************")

        newEditProfile.save((error, newEditProfile) => {
            if (error) {
                console.log("hereeeeeeeeeee3333333")
                console.log("error: " + error)
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                console.log("hereeeeeeeeeee44444444")
                res.status(200).send({
                    'status': 'OK',
                    'profile': newEditProfile
                })
            }
        })

        userName = req.body.userName
        if(previousName != null && previousName != undefined){

            const email = newEditProfile.userId
            const user = await User.findOne({ email: { $eq: email } })
            var array = user.profilesId
            var arr = []

            array.forEach((element)=> {
                if(element == previousName){
                    arr.push(userName)
                }
                else{
                    arr.push(element)
                }
            })

            user.profilesId = arr

            // user._doc.profilesId.forEach(element => {
            //     if(element == previousName){

            //         element = userName 
                    

                    
            //         // user.profileId.get(element) = userName
            //         // element = userName
            //         // let index = user.profilesId.getIndexOf(element)
            //         // console.log("the index = " +  index)
            //         // user.get(index) = userNsme
            //         // console.log("!!!!!!!!!!!!!!!")
            //     }
            // });

            user.save((error) => {
                if (error) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                } else {
                    res.status(200)
                }
            })
        }


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
        const email = profileToDelete.userId
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

        //TODO: remove from the user itself!

        const newUser = await User.findOne({'email' : email})
        newUser.profilesId.forEach(element => {
            if(element == profileToDelete.userName){
                newUser.profilesId.remove(element)
            }
        });

        
        newUser.save((error, newUser) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200)
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