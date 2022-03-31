const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')

const getHello = async (req, res) => {
    res.json({
        adminName: "Yarin Admin User",
    });
}

const getAmounts = async (req, res) => {
    const usersList = await User.find()
    const postsList = await Post.find()
    const profileList = await Profile.find({ status: { $eq: true } })
    console.log(profileList)
    res.json({
        numOfPosts: postsList.length,
        numOfUsers: usersList.length,
        numOnlineProfiles : profileList.length,
    });
}

module.exports = {
    getHello,
    getAmounts
}