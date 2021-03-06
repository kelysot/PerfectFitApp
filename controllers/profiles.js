const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')
const Notification = require('../models/notification_model')
const Comment = require('../models/comment_model')

const getProfile = async (req, res) => {

    const email = req.params.email
    const userName = req.params.userName

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

        const sendProfile = profile
        res.status(200).send(sendProfile)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getProfileByUserName = async (req, res) => {

    const userName = req.params.userName

    if (userName == null || userName == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const profile = await Profile.findOne({ 'userName': userName })
        res.status(200).send(profile)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


const getAllProfiles = async (req, res) => {
    const profilesList = await Profile.find()
    const dataToTable = []

    const createData = async (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let profileData = {
                id: i + 1,
                image: arr[i].pictureUrl,
                firstName: arr[i].firstName,
                lastName: arr[i].lastName,
                userName: arr[i].userName,
                gender: arr[i].gender,
                birthday: arr[i].birthday,
                email: arr[i].userId,
                isDeleted: false,
            }
            dataToTable.push(profileData)
        }
        return dataToTable
    }

    createData(profilesList).then((data) => {
        res.json({
            data: data
        });
    })
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
        pictureUrl: req.body.pictureUrl,
        bigPictureUrl: req.body.bigPictureUrl,
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
        myPostsListId: [],
        isDeleted: false
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
    if (previousName != null && previousName != undefined) {
        userName = previousName
    }

    try {
        const newEditProfile = await Profile.findOne({ 'userName': userName })
        newEditProfile.firstName = req.body.firstName
        newEditProfile.lastName = req.body.lastName
        newEditProfile.gender = req.body.gender
        newEditProfile.userName = req.body.userName
        newEditProfile.birthday = req.body.birthday
        newEditProfile.pictureUrl = req.body.pictureUrl
        newEditProfile.bigPictureUrl = req.body.bigPictureUrl
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
        newEditProfile.isDeleted = req.body.isDeleted

        //Save the profile

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

        //Change the userName in every relevant post: 

        let posts = await Post.find({ profileId: { $eq: previousName } })

        for (let i = 0; i < posts.length; i++) {

            posts[i].profileId = req.body.userName
            posts[i].save((error) => {
                if (error) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                }
            })
        }

        //Change the userName in every relevant notification: 

        let notifications = await Notification.find({ profileIdFrom: { $eq: previousName } })

        for (let i = 0; i < notifications.length; i++) {

            notifications[i].profileIdFrom = req.body.userName
            notifications[i].save((error) => {
                if (error) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                }
            })
        }

        let notificationsMe = await Notification.find({ profileIdMine: { $eq: previousName } })

        for (let i = 0; i < notificationsMe.length; i++) {

            notificationsMe[i].profileIdMine = req.body.userName
            notificationsMe[i].save((error) => {
                if (error) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                }
            })
        }

        //Change the userName in every relevant comment: 

        let comments = await Comment.find({ profileId: { $eq: previousName } })

        for (let i = 0; i < comments.length; i++) {

            comments[i].profileId = req.body.userName
            comments[i].save((error) => {
                if (error) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                }
            })
        }

        //Change the userName in every relevant followers lists: 

        let profileFollowers = await Profile.find({ followers: { $eq: previousName } })

        for (let i = 0; i < profileFollowers.length; i++) {
            for (let j = 0; j < profileFollowers[i].followers.length; j++) {
                if (profileFollowers[i].followers[j] == previousName) {
                    profileFollowers[i].followers[j] = req.body.userName
                    profileFollowers[i].save((error) => {
                        if (error) {
                            res.status(400).send({
                                'status': 'fail',
                                'error': error.message
                            })
                        }
                    })
                    break
                }
            }

        }

        //Change the userName in every relevant trackers lists: 

        let profileTrackers = await Profile.find({ trackers: { $eq: previousName } })

        for (let i = 0; i < profileTrackers.length; i++) {
            for (let j = 0; j < profileTrackers[i].trackers.length; j++) {
                if (profileTrackers[i].trackers[j] == previousName) {
                    profileTrackers[i].trackers[j] = req.body.userName
                    profileTrackers[i].save((error) => {
                        if (error) {
                            res.status(400).send({
                                'status': 'fail',
                                'error': error.message
                            })
                        }
                    })
                    break
                }
            }

        }

        //Change the userName in every relevant posts likes lists: 

        let postLikes = await Post.find({ likes: { $eq: previousName } })

        for (let i = 0; i < postLikes.length; i++) {
            for (let j = 0; j < postLikes[i].likes.length; j++) {
                if (postLikes[i].likes[j] == previousName) {
                    postLikes[i].likes[j] = req.body.userName
                    postLikes[i].save((error) => {
                        if (error) {
                            res.status(400).send({
                                'status': 'fail',
                                'error': error.message
                            })
                        }
                    })
                    break
                }
            }

        }

        //Change profile name in the list of the user:

        userName = req.body.userName
        if (previousName != null && previousName != undefined) {

            const email = newEditProfile.userId
            const user = await User.findOne({ email: { $eq: email } })
            var array = user.profilesId
            var arr = []

            array.forEach((element) => {
                if (element == previousName) {
                    arr.push(userName)
                }
                else {
                    arr.push(element)
                }
            })

            user.profilesId = arr
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

const deleteProfile = async (req, res) => {
    if (req.params.userName == null || req.params.userName == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const profileToDelete = await Profile.findOne({ 'userName': req.params.userName })
        const email = profileToDelete.userId

        // First, we delete all his posts: 
        let postsListToDelete = profileToDelete.myPostsListId

        for (let i = 0; i < postsListToDelete.length; i++) {

            let postToDelete = await Post.findOne({ '_id': postsListToDelete[i] })
            if (postToDelete != null && postToDelete != undefined) {

                postToDelete.isDeleted = true
                await postToDelete.save((error, newPostToDelete) => {
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
        }
        // Remove the profile from profilesList:

        profileToDelete.isDeleted = true
        profileToDelete.save((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The profile was deleted successfully'
                })
            }
        })

        //Second, we remove from the user itself:

        const newUser = await User.findOne({ 'email': email })
        newUser.profilesId.forEach(element => {
            if (element == profileToDelete.userName) {
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


const getProfilesByUserNames = async (req, res) => {

    const userNames = req.params.userNames // We get list as a string.
    arrayUserNames = userNames.substring(1)
    arrayUserNames = arrayUserNames.slice(0, -1)
    arrayUserNames = arrayUserNames.split(", ")

    if (userNames == null || userNames == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        var profileArr = []

        var i = 0
        for (i = 0; i < arrayUserNames.length; i++) {
            var user = arrayUserNames[i]
            var profile = await Profile.findOne({ 'userName': user })
            profileArr.push(profile)
        }

        var theProfileArrToSent = await Profile.find({ '_id': { $in: profileArr }, 'isDeleted': false })

        res.status(200).send(theProfileArrToSent)
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
    getAllProfiles,
    editProfile,
    deleteProfile,
    getProfile,
    checkIfUserNameExist,
    getProfileByUserName,
    getProfilesByUserNames
}