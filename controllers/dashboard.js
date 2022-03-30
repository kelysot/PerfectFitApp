// const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')

const getHello = async (req, res) => {
    res.json({
        adminName: "Yarin Admin User",
    });
    // const usersList = await User.find()
    // const profilesList = await Profile.find()
    // const postsList = await Post.find()

    // res.json({ 
    //     message: "Hello from server!",
    //     numOfPosts: postsList.length,
    //     numOfUsers: usersList.length,
    //     numOfProfiles: profilesList.length 
    // });
}

const getAmounts = async (req, res) => {
    const usersList = await User.find()
    const postsList = await Post.find()
    res.json({
        numOfPosts: postsList.length,
        numOfUsers: usersList.length,
    });
}

module.exports = {
    getHello,
    getAmounts
}